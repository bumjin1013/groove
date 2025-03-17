import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, View} from "react-native";
import Video, {SelectedTrackType} from "react-native-video";
import {height} from "@/utils/dimensions";
import Buttons from "./components/Buttons";
import Animated, {SharedValue, useAnimatedStyle, useDerivedValue} from "react-native-reanimated";
import {Comment, Short} from "@/types/short";

interface ShortsProps {
  data: Short;
  isFocused: boolean;
  commentSheetPosition: SharedValue<number>;
  onPress: {
    like: (id: string) => void;
    comment: (comment: Comment[]) => void;
    share: () => void;
    view: () => void;
  };
}

const Shorts: React.FC<ShortsProps> = ({data, isFocused, commentSheetPosition, onPress}) => {
  const {url, subtitles} = data;
  const [paused, setPaused] = useState(!isFocused);

  useEffect(() => {
    setPaused(!isFocused);
  }, [isFocused]);

  const togglePlay = () => {
    setPaused((prev) => !prev);
  };

  // 바텀시트 높이에 따라 비디오 높이 조절
  const animatedHeight = useDerivedValue(() => {
    return isFocused ? commentSheetPosition.value : height;
  });

  const videoHeightStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    minHeight: height / 2,
  }));

  // 바텀시트 올라오면 버튼 사라지게
  const buttonOpacity = useAnimatedStyle(() => {
    return {
      opacity: commentSheetPosition.value === height ? 1 : 0,
    };
  });

  // 자막 항목을 textTracks로 변환
  const textTracks = subtitles.map((subtitle) => ({
    title: subtitle.languageCode === "ko" ? "Korean" : "English", // 자막 언어 표시
    language: subtitle.languageCode,
    type: subtitle.type,
    uri: subtitle.url,
  }));

  console.log(textTracks);
  return (
    <View style={styles.container}>
      <Pressable onPress={togglePlay}>
        <Animated.View style={[styles.videoContainer, videoHeightStyle]}>
          <Video
            source={{
              uri: url,
              bufferConfig: {
                minBufferMs: 10000, // Minimum buffer before playback starts
                maxBufferMs: 25000, // Maximum buffer allowed
                bufferForPlaybackMs: 300, // Buffer required to start playback
                bufferForPlaybackAfterRebufferMs: 2500,
              },
              textTracks: textTracks,
            }}
            onTextTracks={(e) => {
              console.log("video ", " onTextTracks >> " + JSON.stringify(e.textTracks));
            }}
            selectedTextTrack={{
              type: SelectedTrackType.LANGUAGE,
              value: subtitles.length > 0 ? subtitles[0].languageCode : "en",
            }}
            onTextTrackDataChanged={(e) => {
              //   setSubtitle(e.subtitleTracks)
              console.log("video ", " onTextTrackDataChanged ", JSON.stringify(e.subtitleTracks));
            }}
            style={styles.video}
            controls={false}
            resizeMode="contain"
            paused={paused}
            onTextTracks={(e) => {
              console.log("video ", " onTextTracks >> " + JSON.stringify(e.textTracks));
            }}
          />
        </Animated.View>
      </Pressable>
      <Buttons buttonOpacity={buttonOpacity} data={data} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: height,
  },
  videoContainer: {
    width: "100%",
  },
  video: {
    height: "100%",
  },
});

export default Shorts;

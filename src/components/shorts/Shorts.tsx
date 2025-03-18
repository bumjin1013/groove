import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, View, Dimensions} from "react-native";
import Video, {OnProgressData} from "react-native-video";
import Animated, {SharedValue, useAnimatedStyle} from "react-native-reanimated";
import {Comment, Short} from "@/types/short";
import Subtitles from "react-native-subtitles";
import {Buttons, Info} from "./components";

const {height: screenHeight} = Dimensions.get("window");

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
  const {url, subtitles, title, description, tags} = data;

  const [paused, setPaused] = useState(!isFocused);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setPaused(!isFocused);
  }, [isFocused]);

  const togglePlay = () => {
    setPaused((prev) => !prev);
  };

  const videoHeightStyle = useAnimatedStyle(() => ({
    height: commentSheetPosition.value,
    minHeight: screenHeight / 2,
  }));

  const handleProgress = (progress: OnProgressData) => {
    setCurrentTime(progress.currentTime);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={togglePlay}>
        <Animated.View style={[styles.videoContainer, videoHeightStyle]}>
          <View>
            <Video source={{uri: url}} style={styles.video} controls={false} resizeMode="contain" paused={paused} onProgress={handleProgress} repeat viewType={0} />
          </View>
        </Animated.View>
      </Pressable>
      <View style={styles.overlay}>
        <Subtitles currentTime={currentTime} selectedsubtitle={{file: subtitles[0].url}} textStyle={styles.subtitle} containerStyle={styles.subtitleContainer} />
        <Info tags={tags} title={title} description={description} />
      </View>
      <Animated.View style={styles.button}>
        <Buttons data={data} onPress={onPress} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {position: "relative", height: screenHeight, backgroundColor: "black"},
  videoContainer: {width: "100%"},
  video: {width: "100%", height: "100%"},
  subtitle: {color: "white", fontSize: 14},
  subtitleContainer: {width: "100%", justifyContent: "center", alignItems: "center"},
  overlay: {position: "absolute", bottom: 120, padding: 16},
  button: {position: "absolute", right: 0, bottom: 120},
});

export default Shorts;

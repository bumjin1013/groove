import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, View} from "react-native";
import Video from "react-native-video";
import {height} from "@/utils/dimensions";
import Buttons from "./components/Buttons";
import Animated, {SharedValue, useAnimatedStyle, useDerivedValue} from "react-native-reanimated";
import {Comment, Short} from "@/types/short";

interface ShortsProps {
  data: Short;
  isFocused: boolean;
  showCommentSheet: (comments: Comment[]) => void;
  commentSheetPosition: SharedValue<number>;
}

const Shorts: React.FC<ShortsProps> = ({data, isFocused, commentSheetPosition, showCommentSheet}) => {
  const {url, comments} = data;
  const [paused, setPaused] = useState(!isFocused);

  useEffect(() => {
    setPaused(!isFocused);
  }, [isFocused]);

  const onPress = () => {
    setPaused((prev) => !prev);
  };

  //바텀시트 높이에 따라 비디오 높이 조절
  const animatedHeight = useDerivedValue(() => {
    return isFocused ? commentSheetPosition.value : height;
  });

  const videoHeightStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    minHeight: height / 2,
  }));

  //바텀시트 올라오면 버튼 사라지게
  const buttonOpacity = useAnimatedStyle(() => {
    return {
      opacity: commentSheetPosition.value === height ? 1 : 0,
    };
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Animated.View style={[styles.videoContainer, videoHeightStyle]}>
          <Video source={{uri: url}} style={styles.video} controls={false} resizeMode="contain" paused={paused} />
        </Animated.View>
      </Pressable>
      <Buttons showCommentSheet={() => showCommentSheet(comments)} buttonOpacity={buttonOpacity} data={data} />
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

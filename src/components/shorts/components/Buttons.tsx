import {Pressable, StyleSheet, Text} from "react-native";
import {Eye, Heart, Message, Share} from "@/assets/svgs";
import Animated, {AnimatedStyle} from "react-native-reanimated";
import {Short} from "@/types/short";

interface ButtonsProps {
  showCommentSheet: () => void;
  buttonOpacity: AnimatedStyle;
  data: Short;
}

const Buttons: React.FC<ButtonsProps> = ({showCommentSheet, buttonOpacity, data}) => {
  const {views, likes, comments, shares} = data;

  const buttons = [
    {Icon: Heart, text: "Like", onPress: () => {}, label: "좋아요", value: likes},
    {Icon: Message, text: "Comment", onPress: showCommentSheet, label: "댓글", value: comments.length},
    {Icon: Share, text: "Share", onPress: () => {}, label: "공유", value: shares},
    {Icon: Eye, text: "View", onPress: () => {}, label: "조회수", value: views},
  ];

  return (
    <Animated.View style={[buttonOpacity, styles.container]}>
      {buttons.map(({Icon, onPress, value}, index) => (
        <Pressable key={index} onPress={onPress} style={[styles.button, {marginBottom: buttons.length - 1 !== index ? 8 : 0}]}>
          <Icon width={28} height={28} />
          <Text style={styles.label}>{value}</Text>
        </Pressable>
      ))}
    </Animated.View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {position: "absolute", right: 0, bottom: 200},
  button: {height: 48, width: 48, justifyContent: "center", alignItems: "center"},
  label: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    marginTop: 4,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1,
  },
});

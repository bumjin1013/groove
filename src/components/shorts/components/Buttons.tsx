import {Pressable, StyleSheet, Text, View} from "react-native";
import {Eye, Heart, HeartFill, Message, Share} from "@/assets/svgs";
import {Comment, Short} from "@/types/short";

interface ButtonsProps {
  data: Short;
  onPress: {
    like: (id: string) => void;
    comment: (comment: Comment[]) => void;
    share: () => void;
    view: () => void;
  };
}

const Buttons: React.FC<ButtonsProps> = ({data, onPress}) => {
  const {views, likes, comments, shares, isLiked, id} = data;

  const buttons = [
    {Icon: isLiked ? HeartFill : Heart, text: "Like", onPress: () => onPress.like(id), value: likes},
    {Icon: Message, text: "Comment", onPress: () => onPress.comment(comments), value: comments.length},
    {Icon: Share, text: "Share", onPress: onPress.share, value: shares},
    {Icon: Eye, text: "View", onPress: onPress.view, value: views},
  ];

  return (
    <View>
      {buttons.map(({Icon, onPress, value}, index) => (
        <Pressable key={index} onPress={onPress} style={[styles.button, {marginBottom: buttons.length - 1 !== index ? 8 : 0}]}>
          <Icon width={28} height={28} />
          <Text style={styles.label}>{value}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
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

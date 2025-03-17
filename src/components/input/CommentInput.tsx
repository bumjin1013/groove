import {Keyboard, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {Pressable} from "react-native-gesture-handler";
import {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import {color} from "@/utils/colors";
import {useShortsStore} from "@/zustand/useShortsStore";

interface CommentInputProps {
  shortsId: string;
}

const CommentInput: React.FC<CommentInputProps> = ({shortsId}) => {
  const {addComment} = useShortsStore();

  const [input, setInput] = useState("");

  const onPressSubmit = () => {
    if (input) {
      let body = {id: "c040", author: "나", content: input, createdAt: new Date()};
      addComment({shortsId, body});
      setInput("");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <BottomSheetTextInput value={input} onChangeText={setInput} style={styles.input} placeholder="댓글을 입력하세요" placeholderTextColor={color.lightGray} />
      <Pressable style={[styles.submit, {backgroundColor: input ? color.blue : color.gray}]} onPress={onPressSubmit} disabled={!input}>
        <Text style={[styles.submitText, {color: input ? color.white : color.lightGray}]}>등록</Text>
      </Pressable>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  submit: {backgroundColor: color.lightGray, padding: 8, borderRadius: 4, alignItems: "center", height: 32, justifyContent: "center"},
  submitText: {color: "white", fontSize: 14},
  container: {flexDirection: "row", alignItems: "center", padding: 16, position: "absolute", bottom: 10},
  input: {flex: 1, backgroundColor: color.gray, borderRadius: 4, paddingHorizontal: 8, color: "white", marginRight: 8, height: 32},
});

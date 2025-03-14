import {StyleSheet} from "react-native";
import React, {useEffect} from "react";
import {BottomSheetFlatList, BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import {height} from "@/utils/dimensions";
import {color} from "@/utils/colors";
import {useCommentStore} from "@/zustand/useCommentStore";
import Comment from "../comment";
import {SharedValue} from "react-native-reanimated";
import CommentInput from "../input/CommentInput";

interface CommentSheetProps {
  ref: React.RefObject<BottomSheetModal>;
  commentSheetPosition: SharedValue<number>;
  commentSheetIndex: number;
  setCommentSheetIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CommentSheet: React.FC<CommentSheetProps> = ({ref, commentSheetPosition, commentSheetIndex, setCommentSheetIndex}) => {
  const {comments, setComments} = useCommentStore();

  const snapPoints = ["50%"];

  useEffect(() => {
    return () => {
      setComments([]);
    };
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      maxDynamicContentSize={height / 2}
      handleIndicatorStyle={{backgroundColor: color.lightGray}}
      backgroundStyle={{backgroundColor: color.darkGray}}
      enableDismissOnClose
      enablePanDownToClose
      enableDynamicSizing={false}
      animatedPosition={commentSheetPosition}
      onChange={(index) => setCommentSheetIndex(index)}>
      <BottomSheetView style={styles.container}>
        <BottomSheetFlatList data={comments} renderItem={({item}) => <Comment comment={item} />} keyExtractor={(item) => item.id} style={{}} />
      </BottomSheetView>
      <CommentInput />
    </BottomSheetModal>
  );
};

export default CommentSheet;

const styles = StyleSheet.create({
  container: {backgroundColor: color.darkGray},
});

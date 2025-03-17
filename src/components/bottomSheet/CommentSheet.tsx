import {StyleSheet} from "react-native";
import React, {useMemo} from "react";
import {BottomSheetFlatList, BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import {height} from "@/utils/dimensions";
import {color} from "@/utils/colors";
import {SharedValue} from "react-native-reanimated";
import CommentInput from "../input/CommentInput";
import {useShortsStore} from "@/zustand/useShortsStore";
import Comment from "../comment/Comment";

interface CommentSheetProps {
  ref: React.RefObject<BottomSheetModal | null>;
  commentSheetPosition: SharedValue<number>;
  commentSheetIndex: number;
  viewableIndex: number;
  setCommentSheetIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CommentSheet: React.FC<CommentSheetProps> = ({ref, commentSheetPosition, viewableIndex, setCommentSheetIndex}) => {
  const {data} = useShortsStore();
  const {comments = [], id} = data[viewableIndex];

  const snapPoints = useMemo(() => ["50%"], []);

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
        <BottomSheetFlatList data={comments} renderItem={({item}) => <Comment comment={item} />} keyExtractor={(_, index) => index.toString()} />
      </BottomSheetView>
      <CommentInput shortsId={id} />
    </BottomSheetModal>
  );
};

export default CommentSheet;

const styles = StyleSheet.create({
  container: {backgroundColor: color.darkGray},
});

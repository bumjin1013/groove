import React, {useCallback, useRef, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import CommentSheet from "@/components/bottomSheet/CommentSheet";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {useSharedValue} from "react-native-reanimated";
import {height} from "@/utils/dimensions";
import {useShortsStore} from "@/zustand/useShortsStore";
import Shorts from "@/components/shorts/Shorts";

const ShortsScreen = () => {
  const commentSheetRef = useRef<BottomSheetModal>(null);

  const {data, updateLike} = useShortsStore();

  const [viewableIndex, setViewableIndex] = useState(0); //영상 인덱스
  const [commentSheetIndex, setCommentSheetIndex] = useState(-1); //바텀시트 인덱스

  const commentSheetPosition = useSharedValue(height);

  const onViewableItemsChanged = ({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setViewableIndex(viewableItems[0].index);
    }
  };

  const onPress = {
    like: useCallback((id: string) => {
      updateLike(id);
    }, []),
    comment: useCallback(() => {
      commentSheetRef.current?.present();
    }, []),
    share: useCallback(() => {}, []),
    view: useCallback(() => {}, []),
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item, index}) => <Shorts data={item} isFocused={index === viewableIndex} commentSheetPosition={commentSheetPosition} onPress={onPress} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        initialNumToRender={4}
        maxToRenderPerBatch={10}
        windowSize={5}
        scrollEnabled={commentSheetIndex === -1}
      />

      <CommentSheet
        ref={commentSheetRef}
        viewableIndex={viewableIndex}
        commentSheetPosition={commentSheetPosition}
        commentSheetIndex={commentSheetIndex}
        setCommentSheetIndex={setCommentSheetIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default ShortsScreen;

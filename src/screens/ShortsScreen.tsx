import React, {useEffect, useRef, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import Shorts from "@/components/shorts";
import {shortsData} from "@/constants/dummy";
import CommentSheet from "@/components/bottomSheet/CommentSheet";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {Comment} from "@/types/short";
import {useCommentStore} from "@/zustand/useCommentStore";
import {useSharedValue} from "react-native-reanimated";
import {height} from "@/utils/dimensions";
import {useDummyStore} from "@/zustand/useDummyStore";
import {storage} from "@/utils/mmkv";

const ShortsScreen = () => {
  const commentSheetRef = useRef<BottomSheetModal>(null);

  const {setComments} = useCommentStore();
  const {data, setData} = useDummyStore();

  const [viewableIndex, setViewableIndex] = useState(0); //영상 인덱스
  const [commentSheetIndex, setCommentSheetIndex] = useState(0); //바텀시트 인덱스

  const commentSheetPosition = useSharedValue(height);

  useEffect(() => {
    const cachedData = storage.getString("data");
    if (cachedData) {
      setData(JSON.parse(cachedData));
    } else {
      setData(shortsData);
      storage.set("data", JSON.stringify(shortsData));
    }
  }, []);

  const onViewableItemsChanged = ({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setViewableIndex(viewableItems[0].index);
    }
  };

  const showCommentSheet = (comments: Comment[]) => {
    setComments(comments);
    commentSheetRef.current?.present();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <Shorts data={item} isFocused={index === viewableIndex} showCommentSheet={showCommentSheet} commentSheetPosition={commentSheetPosition} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        initialNumToRender={5}
        scrollEnabled={commentSheetIndex === -1}
      />

      <CommentSheet ref={commentSheetRef} commentSheetPosition={commentSheetPosition} commentSheetIndex={commentSheetIndex} setCommentSheetIndex={setCommentSheetIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ShortsScreen;

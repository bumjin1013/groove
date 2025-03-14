import React, {useEffect} from "react";
import ShortsScreen from "./src/screens/ShortsScreen";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {storage} from "./src/utils/mmkv";
import {useDummyStore} from "./src/zustand/useDummyStore";

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ShortsScreen />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;

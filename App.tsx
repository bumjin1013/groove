import React from "react";
import ShortsScreen from "./src/screens/ShortsScreen";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {SafeAreaProvider} from "react-native-safe-area-context";

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <ShortsScreen />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;

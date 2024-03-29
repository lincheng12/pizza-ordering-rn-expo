import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { LogBox } from "react-native";
import { ThemeProvider } from "./src/hooks/useThemePreference";
import { store, persistor } from "./src/redux/store";
import AppStack from "./src/routes/AppStack";
import { PersistGate } from "redux-persist/integration/react";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'.",
]);

LogBox.ignoreLogs([
  "Setting a timer for a long period of time, i.e. multiple minutes,",
]);

LogBox.ignoreLogs([
  "Deprecation warning: value provided is not in a recognized RFC2822 or ISO format.",
]);

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppStack />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { ThemeProvider } from "./src/hooks/useThemePreference";
import store from "./src/redux/store";
import AppStack from "./src/routes/AppStack";

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <AppStack />
        </Provider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

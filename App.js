import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/hooks/useThemePreference";
import AppStack from "./src/routes/AppStack";

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppStack />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

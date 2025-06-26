import 'react-native-gesture-handler'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { Navigation } from "./src/navigation/AppNavigation";
import { DatabaseProvider } from "./src/database/databaseContext";

export default function App() {
  return (
    <DatabaseProvider>
      <ThemeProvider>
        <GestureHandlerRootView>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </GestureHandlerRootView>
      </ThemeProvider>
    </DatabaseProvider>
  );
}
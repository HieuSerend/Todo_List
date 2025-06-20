import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/AppNavigation";
import { DatabaseProvider } from "./src/database/databaseContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <DatabaseProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </DatabaseProvider>
  );
}
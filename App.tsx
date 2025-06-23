import 'react-native-gesture-handler'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/AppNavigation";
import { DatabaseProvider } from "./src/database/databaseContext";

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
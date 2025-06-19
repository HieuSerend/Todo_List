import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/AppNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
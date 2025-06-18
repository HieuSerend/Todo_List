import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/AppNavigation";
import { useEffect, useCallback } from "react";
import { connectToDatabase, createTables } from "./src/database/database";
import { getTodos } from "./src/database/TodoServices";

export default function App() {
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase()
      await createTables(db)
      await getTodos(db)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
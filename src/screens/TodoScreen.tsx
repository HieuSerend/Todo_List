import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const tasks = [
  { id: '1', title: 'Học React Native' },
  { id: '2', title: 'Làm bài tập' },
  { id: '3', title: 'Đọc tài liệu expo-sqlite' },
];

const TodoScreen = () => {
  return (
    <View>
    <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>Todo List</Text>
      <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Text style={styles.taskText}>{item.title}</Text>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    />
    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({
    listContainer: {
    padding: 16,
  },
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16, // Khoảng cách giữa các task
    elevation: 2, // Đổ bóng cho Android
    shadowColor: '#000', // Đổ bóng cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskText: {
    fontSize: 16,
  },
})
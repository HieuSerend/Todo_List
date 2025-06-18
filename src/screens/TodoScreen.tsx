import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import {addTodo, deleteTodo, getTodos, updateTodo, updateTodoStatus} from '../database/TodoServices'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Types/RootStackParamList'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type TodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TodoScreen'>

const TodoScreen = () => {
  const [todos, setTodos] = useState([])
  const navigation = useNavigation<TodoScreenNavigationProp>();

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>Todo List</Text>
      <FlatList
      data={todos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Text style={styles.taskText}>{item.title}</Text>
          <Text>{item.completed ? '[Done]' : '[]'}</Text>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.fab}
                        onPress={() => navigation.navigate('TaskDetailScreen')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
  fab: {
    position: 'absolute',
    right: 40,
    top: 660,
    backgroundColor: '#add8e6',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
})
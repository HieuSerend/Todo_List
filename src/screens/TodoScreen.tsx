import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import { deleteTodo, getTodos, Todo, updateTodoStatus } from '../database/TodoServices'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Types/RootStackParamList'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useDatabase } from '../database/databaseContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import TodoCard from '../components/TodoCard'
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist'

type TodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TodoScreen'>

const TodoScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const swipeableRefs = useRef<{
    [key: number]: Swipeable | null
  }>({})
  const navigation = useNavigation<TodoScreenNavigationProp>();
  const db = useDatabase()

  useFocusEffect(
    useCallback(() => {
      const fetchTodos = async () => {
        const todoList = await getTodos(db)
        setTodos(todoList)
      }
      fetchTodos()
    }, [db])
  )


  const renderRightActions = () => (
    <View style={styles.swipeRight}>
      <Text>Xóa</Text>
    </View>
  )

  const renderLeftActions = () => (
    <View style={styles.swipeLeft}>
      <Text>Hoàn thành</Text>
    </View>
  )

  const handleDelete = async (id: number) => {
    await deleteTodo(db, id)
    const todoList = await getTodos(db)
    setTodos(todoList)
  }

  const handleComplete = async (id: number) => {
    await updateTodoStatus(db, 1, id)
    const todoList = await getTodos(db)
    setTodos(todoList)
  }

  const renderTaskItems = ({item, drag}: RenderItemParams<Todo>) => (
    <Swipeable
      ref={ref => {swipeableRefs.current[item.id] = ref}}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableOpen={(direction) => {
        if (direction === 'left') {
          handleComplete(item.id)
          swipeableRefs.current[item.id]?.close()
        }
        if (direction === 'right') {
          handleDelete(item.id)
          swipeableRefs.current[item.id]?.close() 
        }
      }}
    >
      <TodoCard
        title={item.title}
        deadline={item.deadline}
        completed={item.completed}
        onPress={() => navigation.navigate("TaskDetailScreen", { id: item.id })}
        onLongPress={() => {
          drag()
        }}
      />
    </Swipeable>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todo List</Text>
      </View>

      {/* Task List */}
      <View style={styles.taskListContainer}>
        {todos.length === 0 ? (
          <Text style={styles.noneTaskText}>Không có task nào, ấn nút phía dưới để thêm task mới!</Text>
        ) : (
          <DraggableFlatList style={styles.taskItem}
            data={todos}
            keyExtractor={item => item.id.toString()}
            renderItem={renderTaskItems}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />
            }
            onDragEnd={({data}) => {
              setTodos(data)
            }}
          />
        )}

        {/* Add Task Button */}
        <TouchableOpacity style={styles.fab}
          onPress={() => navigation.navigate('TaskDetailScreen', {})}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default TodoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  headerTitle: {
    marginBottom: 4,
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
  },
  taskListContainer: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
  taskItem: {
    padding: 20,
    marginBottom: 30,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskText: {
    fontSize: 16,
  },
  noneTaskText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    right: 40,
    top: 660,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    elevation: 5,
    backgroundColor: '#add8e6',
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  swipeRight: {
    backgroundColor: '#ff4d4f',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '90%',
    borderRadius: 12,
    marginVertical: 6,
  },
  swipeLeft: {
    backgroundColor: '#90EE90',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '90%',
    borderRadius: 12,
    marginVertical: 6,
  },
})
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import { deleteTodo, getTodos, Todo, updateTodoStatus, getTodosByDeadlineAsc, updateTodoOrder } from '../database/TodoServices'
import { useNavigation} from '@react-navigation/native'
import { RootStackParamList } from '../Types/RootStackParamList'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useDatabase } from '../database/databaseContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import TodoCard from '../components/TodoCard'
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist'
import { useTheme } from '../Context/ThemeContext'
import { Colors } from '../utils/Colors'

type TodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TodoScreen'>

const TodoScreen = () => {
  const {theme} = useTheme()
  const [todos, setTodos] = useState<Todo[]>([])
  const [isReordering, setIsReordering] = useState(false)
  const swipeableRefs = useRef<{
    [key: number]: Swipeable | null
  }>({})
  const navigation = useNavigation<TodoScreenNavigationProp>();
  const db = useDatabase()

  useFocusEffect(
    useCallback(() => {
      const fetchTodos = async () => {
        if (!isReordering) {
          const todoList = await getTodos(db)
          setTodos(todoList)
        }
      }
      fetchTodos()
    }, [db, isReordering])
  )


  const renderRightActions = () => (
    <View style={[styles.swipeRight, 
    {backgroundColor: theme === 'light' ? Colors.light.danger : Colors.dark.danger}]}>
      <Text>Xóa</Text>
    </View>
  )

  const renderLeftActions = () => (
    <View style={[styles.swipeLeft, 
    {backgroundColor: theme === 'light' ? Colors.light.success : Colors.dark.success}]}>
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

  const handleArrangeByDeadline = async () => {
    setIsReordering(true)
    const todoList = await getTodosByDeadlineAsc(db)
    setTodos(todoList)
    setIsReordering(false)
  }

  const handleDragEnd = async (data: Todo[]) => {
    setIsReordering(true)
    setTodos(data)
    try {
      await updateTodoOrder(db, data)
    } catch(error) {
      console.log(error)
      const originalTodos = await getTodos(db)
      setTodos(originalTodos)
    } finally {
      setIsReordering(false)
    }
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
    <SafeAreaView style={[styles.container, 
                {backgroundColor: theme === 'light' ? Colors.light.primary : Colors.dark.primary}]}>

      {/* Header */}
      <View style={[styles.header, 
                  {backgroundColor: theme === 'light' ? Colors.light.primary : Colors.dark.primary},
                  {borderBottomColor: theme === 'light' ? Colors.light.border : Colors.dark.border}]}>
        <Text style={[styles.headerTitle, {color: theme === 'light' ? Colors.light.text : Colors.dark.text}]}>Todo List</Text>
      </View>

      {/* Sort by deadline button */}
      <View style={[styles.sortByDeadlineContainer, {backgroundColor: theme === 'light' ? Colors.light.primary : Colors.dark.primary}]}>
        <TouchableOpacity onPress={handleArrangeByDeadline}>
          <Text style={[styles.sortByDeadlineText, {color: theme === 'light' ? Colors.light.text : Colors.dark.text}]}>Sắp xếp theo deadline</Text>
        </TouchableOpacity> 
      </View>

      {/* Task List */}
      <View style={styles.taskListContainer}>
        {todos.length === 0 ? (
          <Text style={[styles.noneTaskText, {color: theme === 'light' ? Colors.light.text : Colors.dark.text}]}>Không có task nào, ấn nút phía dưới để thêm task mới!</Text>
        ) : (
          <DraggableFlatList style={styles.taskItem}
            data={todos}
            keyExtractor={item => item.id.toString()}
            renderItem={renderTaskItems}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />
            }
            onDragEnd={({data}) => handleDragEnd(data)}
          />
        )}

        {/* Add Task Button */}
        <TouchableOpacity style={[styles.fab, {backgroundColor: theme === 'light' ? Colors.light.accent : Colors.dark.accent}]}
          onPress={() => navigation.navigate('TaskDetailScreen', {})}>
          <Text style={[styles.fabText, {color: theme === 'light' ? Colors.light.primary : Colors.dark.primary}]}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default TodoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  headerTitle: {
    marginBottom: 4,
    fontSize: 28,
    fontWeight: '700',
  },
  sortByDeadlineContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortByDeadlineText: {
    fontSize: 16,
    fontWeight: '700',
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
    right: 10,
    bottom: 10,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    elevation: 5,
    zIndex: 100
  },
  fabText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  swipeRight: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '90%',
    borderRadius: 12,
    marginVertical: 6,
  },
  swipeLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '90%',
    borderRadius: 12,
    marginVertical: 6,
  },
})
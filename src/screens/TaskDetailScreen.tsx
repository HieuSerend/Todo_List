import { StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Types/RootStackParamList'
import { useNavigation, useRoute } from '@react-navigation/native';
import { addTodo, getTodoById, updateTodo, updateTodoStatus } from '../database/TodoServices';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDatabase } from '../database/databaseContext';

type TaskDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetailScreen'>;

const TaskDetailScreen = () => {
  const route = useRoute()
  const id = (route.params as { id?: number })?.id
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState<Date>(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [completed, setCompleted] = useState(false)
  const navigation = useNavigation<TaskDetailScreenNavigationProp>()
  const db = useDatabase()

  useEffect(() => {
    if (db && id) {
      const loadTodo = async () => {
        const todo = await getTodoById(db, id)
        if (todo) {
          setTitle(todo.title)
          setDescription(todo.description)
          setDeadline(new Date(todo.deadline))
          setCompleted(!!todo.completed)
        }
      }
      loadTodo()
    }
  }, [db, id])

  const handleUpdate = async () => {
    await updateTodo(db, {
      id,
      title,
      description,
      deadline: deadline.toISOString(),
      completed: false
    })
    navigation.goBack()
  }

  const handleAdd = async () => {
    await addTodo(db, {
      id,
      title,
      description,
      deadline: deadline.toISOString(),
      completed: false
    })
    navigation.goBack()
  }

  const handleStatus = async () => {
    const todo = await getTodoById(db, id)
    if (todo.completed) {
      await updateTodoStatus(db, 0, id)
      setCompleted(false)
    } else {
      await updateTodoStatus(db, 1, id)
      setCompleted(true)
    }
    navigation.goBack()
  }

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'android')
    if (selectedDate) setDeadline(selectedDate)
    setShowDatePicker(false)
    setShowTimePicker(false)
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {id ? 'Chỉnh sửa Task' : 'Thêm Task Mới'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tiêu đề *</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Nhập tiêu đề task..."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
          />
        </View>
        {/* Description Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mô tả</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Nhập mô tả chi tiết..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        {/* Deadline Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Deadline</Text>
          {/**Date*/}
          <View style={styles.deadlineButtonContainer}> 
            <TouchableOpacity
            style={styles.deadlineButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.deadlineText}>
              {deadline.toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </TouchableOpacity>

          {/**Time*/}
          <TouchableOpacity
            style={styles.deadlineButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.deadlineText}>
              {deadline.toLocaleTimeString('vi-VN', {
                hourCycle:'h24'
              })}
            </Text>
          </TouchableOpacity>
          </View>
        </View>
        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode='date'
            display='calendar'
            onChange={onDateChange}
            minimumDate={new Date()}
          />)
        }
        {/* Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            is24Hour={true}
            value={deadline}
            mode='time'
            display='clock'
            onChange={onDateChange}
          />
        )
        }

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, !title.trim() && styles.saveButtonDisabled]}
          onPress={id ? handleUpdate : handleAdd}
          disabled={!title.trim()}
        >
          <Text style={styles.saveButtonText}>
            {id ? 'Cập nhật Task' : 'Tạo Task'}
          </Text>
        </TouchableOpacity>

        {/* Mark as completed button */}
        {id && (
          <TouchableOpacity
            style={styles.markCompleteButton}
            onPress={handleStatus}
          >
            <Text style={styles.markCompleteText}>
              {completed ? 'Đánh dấu là chưa hoàn thành' : 'Đánh dấu là đã hoàn thành'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  )
}

export default TaskDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#495057',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  descriptionInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    minHeight: 100,
  },
  deadlineButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e9ecef',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deadlineText: {
    fontSize: 16,
    color: '#212529',
  },
  deadlineIcon: {
    fontSize: 20,
  },
  saveButton: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  markCompleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
  },
  markCompleteText: {
    color: '#6F8FAF',
  },
  deadlineButtonContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
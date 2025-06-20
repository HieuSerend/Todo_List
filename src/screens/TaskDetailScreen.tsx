import { StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Types/RootStackParamList'
import { useNavigation, useRoute } from '@react-navigation/native';
import { addTodo, getTodoById, updateTodo } from '../database/TodoServices';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDatabase } from '../database/databaseContext';

type TaskDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetailScreen'>;

const TaskDetailScreen = () => {
  const route = useRoute()
  const id = (route.params as { id?: number })?.id
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState(false)
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

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'android')
    if (selectedDate) setDeadline(selectedDate)
    setShowPicker(false)
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
          <TouchableOpacity
            style={styles.deadlineButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.deadlineText}>
              {deadline.toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <Text style={styles.deadlineIcon}>📅</Text>
          </TouchableOpacity>
        </View>
        {/* Date Picker */}
        {showPicker && (
          <DateTimePicker
            value={deadline}
            mode='date'
            display='default'
            onChange={onChange}
            minimumDate={new Date()}
          />
        )}

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
})
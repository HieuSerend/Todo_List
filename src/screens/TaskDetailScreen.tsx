import { StyleSheet, Text, TextInput, Button, TouchableOpacity, View, Platform } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Types/RootStackParamList'
import { useNavigation } from '@react-navigation/native';
import { initDB } from '../database/databaseService';
import { addTodo} from '../database/TodoServices';
import DateTimePicker from '@react-native-community/datetimepicker'

type TaskDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetailScreen'>;

const TaskDetailScreen = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const navigation = useNavigation<TaskDetailScreenNavigationProp>()

  const onChange = (event: any, selectedDate?: Date ) => {
    setShowPicker(Platform.OS === 'android')
    if (selectedDate) setDeadline(selectedDate)
    setShowPicker(false)
  }

  const handleAdd = async () => {
    const db = await initDB()
    await addTodo(db, {
      id: 0,
      title,
      description,
      deadline: deadline.toISOString(),
      completed: false,
    })
    navigation.goBack()
  }
  
  return (
    <View style = {styles.container}>
      <TouchableOpacity style={styles.icon}
                        onPress={() => navigation.goBack()}>
        <Text style={styles.text}> {'<'} </Text>
      </TouchableOpacity>
      <TextInput placeholder="Nhập tiêu đề" value={title} onChangeText={setTitle}/>
      <TextInput placeholder="Nhập mô tả" value={description} onChangeText={setDescription}/>
      <Button title='Chọn deadline' onPress={() => setShowPicker(true)} />
      <Text>Deadline: {deadline.toLocaleDateString()}</Text>
      {showPicker && (
        <DateTimePicker
          value={deadline}
          mode='date'
          display='default'
          onChange={onChange} />
      )}
      <TouchableOpacity onPress={() => handleAdd()}>
        <Text>Add task</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskDetailScreen

const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  icon: {
    position: 'absolute',
    fontSize: 24,
    marginRight: 4,
    left: 20,
    top: 50
  },
  text: {
    fontSize: 16,
  },

})
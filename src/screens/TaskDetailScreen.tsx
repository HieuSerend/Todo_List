import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Types/RootStackParamList'
import { useNavigation } from '@react-navigation/native';

type TaskDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetailScreen'>;

const TaskDetailScreen = () => {
  const [newTitle, setNewTitle] = useState<''>()
  const navigation = useNavigation<TaskDetailScreenNavigationProp>()
  
  return (
    <View style = {styles.container}>
      <Text>This is task detail screen</Text>
      <TouchableOpacity style={styles.icon}
                        onPress={() => navigation.goBack()}>
        <Text style={styles.text}> {'<'} </Text>
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
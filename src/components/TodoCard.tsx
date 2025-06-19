import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface TaskProps {
  title: string,
  deadline: string,
  completed: boolean,
  onPress?: () => void;
}

const TodoCard = ({title, deadline, completed, onPress}: TaskProps) => {
  const date = new Date(deadline)

  const days = ['Sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ]
  const dayOfWeek = days[date.getDay()]

  const day = date.getDate()
  const month = date.getMonth() + 1

  return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text> 
        <Text>{dayOfWeek}, {day}/{month}</Text>
    </View>
  )
}

export default TodoCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 50,
        backgroundColor: '#90EE90',
        borderRadius: 50,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    doneText: {
      textDecorationLine: 'line-through',
      color: '#888'
    },
    deadline: {
      position: 'absolute',
      fontSize: 6,
      fontWeight: 'heavy',
    }

})
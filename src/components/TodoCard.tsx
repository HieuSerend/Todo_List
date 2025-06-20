import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface TaskProps {
  title: string,
  deadline: string,
  completed: boolean,
  onPress?: () => void;
}

const TodoCard = ({ title, deadline, completed, onPress }: TaskProps) => {
  const date = new Date(deadline)

  const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
  const dayOfWeek = days[date.getDay()]

  const day = date.getDate()
  const month = date.getMonth() + 1

  return (
      <TouchableOpacity style={[styles.card, completed && styles.cardCompleted]} onPress={onPress}>
        <View style={styles.leftSection}>
          <Text style={[styles.title, completed && styles.titleCompleted]}>
            {title}
          </Text>
          <Text style={styles.deadline}>
            {dayOfWeek}, {day}/{month} 
          </Text>
        </View>
        <View>
          {completed ? (
            <Text style={styles.completedIcon}>✔️</Text>
          ) : (
            <View style={styles.incompleteDot}/>
          )}
        </View>
      </TouchableOpacity>
  )
}

export default TodoCard

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 2,
  },
  cardCompleted: {
    backgroundColor: '#f1f3f4',
    opacity: 0.7,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontWeight: '400',
  },
  deadline: {
    fontSize: 14,
    color: '#6c757d',
  },
  completedIcon: {
    fontSize: 22,
    color: '#28a745',
  },
  incompleteDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
})
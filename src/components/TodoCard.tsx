import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '../Context/ThemeContext'
import { Colors } from '../utils/Colors'

interface TaskProps {
  title: string,
  deadline: string,
  completed: boolean,
  onPress?: () => void,
  onLongPress?: () => void,
}

const TodoCard = ({ title, deadline, completed, onPress, onLongPress }: TaskProps) => {
  const date = new Date(deadline)
  const { theme } = useTheme()
  const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
  const dayOfWeek = days[date.getDay()]

  const day = date.getDate()
  const month = date.getMonth() + 1
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  const timeString = `${hour}:${minute}`
  
  return (
      <TouchableOpacity style={[styles.card, completed && styles.cardCompleted, 
        {backgroundColor: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary},
        {borderColor: theme === 'light' ? Colors.light.border : Colors.dark.border}]} 
      onPress={onPress}
      onLongPress={onLongPress}
      >
        <View style={styles.leftSection}>
          <Text style={[styles.title, completed && styles.titleCompleted, 
            {color: theme === 'light' ? Colors.light.text : Colors.dark.text}]}>
            {title}
          </Text>
          <Text style={[styles.deadline, {color: theme === 'light' ? Colors.light.textSecondary : Colors.dark.textSecondary}]}>
          Hạn tới: {timeString}, {dayOfWeek}, {day}/{month}
          </Text>
        </View>
        <View>
          {completed ? (
            <Text style={[styles.completedIcon, {color: theme === 'light' ? Colors.light.text : Colors.dark.text}]}>✔️</Text>
          ) : (
            <View style={[styles.incompleteDot, 
              {backgroundColor: theme === 'light' ? Colors.light.completedDot : Colors.dark.completedDot}]}/>
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
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  cardCompleted: {
    opacity: 0.7,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    fontWeight: '400',
  },
  deadline: {
    fontSize: 14,
  },
  completedIcon: {
    fontSize: 22,
  },
  incompleteDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
})
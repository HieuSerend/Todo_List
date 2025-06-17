import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TaskDetailScreen = () => {
  return (
    <View style = {styles.container}>
      <Text>This is task detail screen</Text>
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
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TodoCard = () => {
  return (
    <View style={styles.container}>
      <Text>TodoCard</Text>
    </View>
  )
}

export default TodoCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
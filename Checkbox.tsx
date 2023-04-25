import React, { useRef, useEffect, ReactElement } from 'react'
import { StyleSheet, View, Animated, Text, TouchableWithoutFeedback } from 'react-native'
import Checkmark from './assets/checkmark.svg'

type PropsType = {
  checked: boolean,
  onPress: () => void,
  children: ReactElement
} 

const Checkbox: React.FC<PropsType> = (props: PropsType) => {
  const { children, checked, onPress } = props
  const growAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if(checked) {
      Animated.timing(growAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(growAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }).start();
    }
  }, [checked])

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        {children}
        <View style={styles.outerContainer}>
          <Animated.View style={[styles.container, { width: growAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }), height: growAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }), opacity: growAnim }]}>
            <Checkmark />
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F80ED',
    overflow: 'hidden'
  },
  container: {
    backgroundColor: '#2F80ED',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  text: {
    color: '#fff'
  }
})

export default Checkbox
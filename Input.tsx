import React, { useRef } from 'react'
import { StyleSheet, View, Animated, Easing, TextInput, TouchableOpacity, TextInputProps } from 'react-native'

const Input: React.FC<TextInputProps> = (props: TextInputProps) => {
  const { value, editable } = props
  const animateStatus = value ?  useRef(new Animated.Value(1)).current : useRef(new Animated.Value(0)).current;
  const refInput = useRef<React.ElementRef<typeof TextInput>>(null);

  const startAnimation = (toValue: number) => {
    Animated.timing(animateStatus, {
      toValue,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false
    }).start();
  }

  return (
    <View style={{ position: 'relative' }}>
      <TextInput ref={refInput} {...props} onFocus={() => startAnimation(1)} onBlur={() => value ? null : startAnimation(0)} style={[styles.container, { color: editable !== false ? '#2F80ED' : '#828282' }]} />
      <TouchableOpacity style={styles.label} activeOpacity={1} onPress={() => refInput.current?.focus()}>
        <Animated.Text style={[
          {color: editable !== false ? '#2F80ED' : '#828282'},
          { 
            transform: [{ translateY: animateStatus.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -12],
                }) 
              }],
            fontSize: animateStatus.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 12],
            })
          } 
        ]}>
          Digite o número de telefone
        </Animated.Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    paddingLeft: 16,
    paddingTop: 12,
    fontSize: 20,
  },
  label: {
    fontSize: 12,
    position: 'absolute',
    left: 16,
    top: 20
  },
  innerContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 80
  }
})

export default Input
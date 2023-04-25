import React, { useRef } from 'react'
import { Animated, Easing, TextInput, TextInputProps } from 'react-native'
import * as S from './input.styles'

type PropsTypes = {
  label: string
}

const Input: React.FC<TextInputProps & PropsTypes> = (props: TextInputProps & PropsTypes) => {
  const { value, editable, label } = props

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
    <S.Container>
      <S.TextInput ref={refInput} {...props} onFocus={() => startAnimation(1)} onBlur={() => value ? null : startAnimation(0)} />
      <S.LabelContainer activeOpacity={1} onPress={() => refInput.current?.focus()}>
        <S.AnimatedLabel editable={editable} style={
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
        }>
          {label}
        </S.AnimatedLabel>
      </S.LabelContainer>
    </S.Container>
  )
}

export default Input
import React, { useRef, useEffect, ReactElement } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native'
import * as S from './checkbox.styles'
import Checkmark from '../../../assets/checkmark.svg'

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
      <S.Container>
        {children}
        <S.BoxContainer>
          <S.AnimatedBox style={{ width: growAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }), height: growAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }), opacity: growAnim }}>
            <Checkmark />
          </S.AnimatedBox>
        </S.BoxContainer>
      </S.Container>
    </TouchableWithoutFeedback>
  )
}

export default Checkbox
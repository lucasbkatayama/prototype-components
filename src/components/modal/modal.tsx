import React, { ReactNode, useEffect, useRef } from 'react'
import { Dimensions, Animated, Easing, Text, TouchableWithoutFeedback } from 'react-native'
import Close from "../../../assets/Black.svg";
import * as S from './modal.styles'

type PropsTypes = {
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<PropsTypes> = (props: PropsTypes) => {
  const { onClose, children } = props
  const { height, width } = Dimensions.get('screen');
  const startPointY = height;
  const transY = useRef(new Animated.Value(startPointY));

  useEffect(() => {
      startAnimation(0);
  }, []);

  const startAnimation = (toValue: number) => {
   Animated.timing(transY.current, {
        toValue,
        duration: 350,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }).start();
  }

  const onPress = () => {
    startAnimation(startPointY)
    setTimeout(() => {
      onClose();
    }, 350);
  }

  const generateBackgroundOpacity = () => {
    if (startPointY >= 0) {
     return transY.current.interpolate({
        inputRange: [0, startPointY],
        outputRange: [0.8, 0],
        extrapolate: 'clamp'
      })
    } else {
     return transY.current.interpolate({
        inputRange: [startPointY, 0],
        outputRange: [0, 0.8],
        extrapolate: 'clamp'
      })
    }
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <S.AnimatedOverlay style={{width, height, opacity: generateBackgroundOpacity()}} />
      </TouchableWithoutFeedback>
      <S.AnimatedContainer onStartShouldSetResponder={() => true} style={{width, transform: [{ translateY: transY.current }]}}>
        <S.CloseButton onPress={onPress}>
          <Close/>
        </S.CloseButton>
        {children}
      </S.AnimatedContainer>
    </>
  )
}

export default Modal
import React, { useRef, useEffect } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as S from './toast-message.styles'

type PropsTypes = {
  title: string
  message: string
  type?: 'error' | 'warn' | 'success'
  onClose: () => void
}

const ToastMessage: React.FC<PropsTypes> = (props: PropsTypes) => {
  const { title, message, type, onClose } = props

  const popAnim = useRef(new Animated.Value(0)).current;
  const loadingAnim = new Animated.Value(100);
  const inputRange = [0, 100];
  const outputRange = ["0%", "100%"]

  const animatedWidth = loadingAnim.interpolate({inputRange, outputRange});

  const startAnimation = () => {
    Animated.timing(popAnim, {
      toValue: 320,
      duration: 200,
      useNativeDriver: true,
    }).start(popOut());
  };

  useEffect(() => {
    startAnimation()
    startLoadingAnimation()
  }, [])

  const popOut = (): Animated.EndCallback | undefined => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        onClose()
      }, 200)
    }, 10000);
    return
  };
  
  const instantPopOut = () => {
    Animated.timing(popAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    
    setTimeout(() => {
      onClose()
    }, 200)
  };

  const startLoadingAnimation = () => {
    Animated.timing(loadingAnim, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: false
    }).start();
  }

  return (
    <S.AnimatedWrapper style={{ transform: [{ translateY: popAnim }]}}>
      <TouchableWithoutFeedback onPress={instantPopOut}>
          <S.Container type={type}>

            <S.ContentContainer>
              <S.TextContainer>
                <S.Title>{title}</S.Title>
                <S.Text>{message}</S.Text>
              </S.TextContainer>
              <Entypo name="cross" size={24} color="white"/>
            </S.ContentContainer>

            <S.LoadingBar style={{ width: animatedWidth }} />

          </S.Container>
      </TouchableWithoutFeedback>
    </S.AnimatedWrapper>
  );
};

export default ToastMessage;
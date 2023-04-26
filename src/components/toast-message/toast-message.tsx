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
  onClose: () => void
}

const ToastMessage: React.FC<PropsTypes> = (props: PropsTypes) => {
  const { title, message, onClose } = props

  const popAnim = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(popAnim, {
      toValue: 120,
      duration: 200,
      useNativeDriver: true,
    }).start(popOut());
  };

  useEffect(() => {
    startAnimation()
  }, [])

  const popOut = (): Animated.EndCallback | undefined => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      onClose()
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

  return (
    <S.AnimatedContainer style={{ transform: [{ translateY: popAnim }]}}>
      <TouchableWithoutFeedback onPress={instantPopOut}>
        <S.ContentContainer>
          <S.TextContainer>
            <S.Title>{title}</S.Title>
            <S.Text>{message}</S.Text>
          </S.TextContainer>
          <Entypo name="cross" size={24} color="white"/>
        </S.ContentContainer>
      </TouchableWithoutFeedback>
    </S.AnimatedContainer>
  );
};

export default ToastMessage;
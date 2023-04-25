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
  show: boolean
}

const ToastMessage: React.FC<PropsTypes> = (props: PropsTypes) => {
  const { title, message, show } = props

  const popAnim = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(popAnim, {
      toValue: 160,
      duration: 200,
      useNativeDriver: true,
    }).start(popOut());
  };

  useEffect(() => {
    if (show) startAnimation()
    else instantPopOut()
  }, [show])

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, 10000);
  }; 
  
  const instantPopOut = () => {
    Animated.timing(popAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
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
import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as S from './toast-message.styles'

const ToastMessage = () => {
  const [status, setStatus] = useState('success');
  const popAnim = useRef(new Animated.Value(0)).current;

  const successColor = "#6dcf81";
  const successHeader = "Código enviado.";
  const successMessage = "Se você ainda não recebeu, por favor verifique se preencheu o seu número de telefone corretamente.";
  const failColor = "#bf6060";
  const failHeader = "Failed!";
  const failMessage = "You pressed the fail button";

  const startAnimation = () => {
    Animated.timing(popAnim, {
      toValue: 170,
      duration: 200,
      useNativeDriver: true,
    }).start(popOut());
  };

  useEffect(() => {
    startAnimation()
  }, [])

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
          <S.TextContainer style={{ flex: 1, paddingRight: 10 }}>
            <S.Title>
              {status === "success" ? successHeader : failHeader}
            </S.Title>
            <S.Text>
              {status === "success" ? successMessage : failMessage}
            </S.Text>
          </S.TextContainer>
          <Entypo name="cross" size={24} color="white"/>
        </S.ContentContainer>
      </TouchableWithoutFeedback>
    </S.AnimatedContainer>
  );
};

export default ToastMessage;
import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

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
      toValue: 140,
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
    <Animated.View
      style={[
        styles.toastContainer,
        {
          transform: [{ translateY: popAnim }],
        },
      ]}
    >
      <TouchableWithoutFeedback onPress={instantPopOut}>
        <View style={styles.toastRow}>
          <View style={{ width: '90%' }}>
            <Text style={{ fontWeight: "bold", fontSize: 14, color: '#fff', marginBottom: 5 }}>
              {status === "success" ? successHeader : failHeader}
            </Text>
            <Text style={{ fontSize: 12, color: '#fff' }}>
              {status === "success" ? successMessage : failMessage}
            </Text>
          </View>
          <Entypo name="cross" size={24} color="white"/>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: -100,
    width: '100%',
    paddingHorizontal: 25
  },
  toastRow: {
    width: '100%',
    padding: 15,
    backgroundColor: '#27AE60',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 4
  }
});
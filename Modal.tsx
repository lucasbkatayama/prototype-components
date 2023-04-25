import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Dimensions, Animated, Easing, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Close from "./assets/Black.svg";

type PropsTypes = {
  onClose: () => void
}

const Modal: React.FC<PropsTypes> = (props: PropsTypes) => {
  const { onClose } = props
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
        <Animated.View style={[styles.outerContainer, {width, height}, { opacity: generateBackgroundOpacity() }]} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.container, {width}, { transform: [{ translateY: transY.current }] }]}>
        <View onStartShouldSetResponder={event => true} style={styles.innerContainer}>
          <TouchableOpacity onPress={onPress} style={{ marginBottom: 20, alignSelf: 'flex-end' }}>
            <Close/>
          </TouchableOpacity>
          <Text style={{ fontSize: 14 }}>{`Os prêmios podem ser utilizazados apenas uma única vez.\n\nÉ possível utilizar vários prêmios em um único pedido.\n\nPara utilizar o prêmio, basta pedir para o atendente do estabelecimento na hora de efetuar o pedido.\n\nFique atento para o prazo de utilização do prêmio para não perdê-lo.`}</Text>
        </View>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#2b4369',
    zIndex: 1
  },
  container: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 2
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

export default Modal
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';

const CODE_LENGTH = 4;

const CodeInput: React.FC = () => {
  const [code, setCode] = useState('');
  const [containerIsFocused, setContainerIsFocused] = useState(false);

  const codeDigitsArray = [...Array(CODE_LENGTH).keys()];

  const ref = useRef<TextInput>(null);

  const handleOnPress = () => {
    setContainerIsFocused(true);
    ref?.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };

  const toDigitInput = (_value: number, idx: number) => {
    const emptyInputChar = ' ';
    const digit = code[idx] || emptyInputChar;
    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;
    
    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      containerIsFocused && isFocused
        ? {...style.inputContainer, ...style.inputContainerFocused}
        : style.inputContainer;

    return (
      <View key={idx} style={containerStyle}>
        <Text style={style.inputText}>{digit}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Pressable style={style.inputsContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={ref}
        value={code}
        onChangeText={setCode}
        onBlur={handleOnBlur}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        style={style.hiddenCodeInput}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 80,
    width: 60,
    backgroundColor: '#F2F2F2'
  },
  inputContainerFocused: {
    shadowColor: '#2F80ED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  inputText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#2F80ED',
    fontFamily: 'Menlo-Regular',
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
});

export default CodeInput;
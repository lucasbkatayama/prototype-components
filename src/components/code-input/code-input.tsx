import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';

import * as S from './code-input.styles'

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

    return (
      <S.FakeInputBox key={idx} isFocused={containerIsFocused && isFocused}>
        <S.FakeInputText>{digit}</S.FakeInputText>
      </S.FakeInputBox>
    );
  };

  return (
    <SafeAreaView>
      <S.Container onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </S.Container>
      <S.HiddenInput
        ref={ref}
        value={code}
        onChangeText={setCode}
        onBlur={handleOnBlur}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
      />
    </SafeAreaView>
  );
};

export default CodeInput;
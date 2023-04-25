import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  TextInput
} from 'react-native';

import * as S from './code-input.styles'

type PropsTypes = {
  codeLength?: number
  value: string
  onChange: (e: string) => void
}

const CodeInput: React.FC<PropsTypes> = (props: PropsTypes) => {
  const { value, codeLength = 4, onChange } = props

  const [containerIsFocused, setContainerIsFocused] = useState(false);

  const codeDigitsArray = [...Array(codeLength).keys()];

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
    const digit = value[idx] || emptyInputChar;
    const isCurrentDigit = idx === value.length;
    const isLastDigit = idx === codeLength - 1;
    const isCodeFull = value.length === codeLength;
    
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
        value={value}
        onChangeText={onChange}
        onBlur={handleOnBlur}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={codeLength}
      />
    </SafeAreaView>
  );
};

export default CodeInput;
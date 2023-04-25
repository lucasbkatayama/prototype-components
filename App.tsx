import { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, Button, Platform } from 'react-native';
import Modal from './Modal'
import Checkbox from './src/components/checkbox/checkbox'
import Input from './src/components/input/input'
import CodeInput from './src/components/code-input/code-input'
import ToastMessage from './ToastMessage'

export default function App() {
  const [modal, setModal] = useState(false)
  const [checked, setCheck] = useState(false)
  const [input1, setInput1] = useState('')

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 25, flex: 1 }} contentContainerStyle={{ justifyContent: 'space-around', flex: 1 }}>
        <Button title='Open modal' onPress={() => setModal(true)} />
        <Checkbox checked={checked} onPress={() => setCheck(!checked)}>
          <Text style={{ fontWeight: '500', fontSize: 12, width: 275 }}>Li e estou de acordo com o <Text style={{ color: '#2F80ED' }}>Termo de Uso</Text> e a <Text style={{ color: '#2F80ED' }}>Política de Privacidade</Text></Text>
        </Checkbox>
        <Input value={input1} onChangeText={setInput1} />
        <Input value='Disabled' editable={false} />
        <CodeInput />
      </ScrollView>
      <ToastMessage />
      {modal && <Modal onClose={() => setModal(false)} />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

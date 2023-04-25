import { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, Button, Platform } from 'react-native';
import Modal from './src/components/modal/modal'
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
      {modal && 
        <Modal onClose={() => setModal(false)}>
          <Text style={{ fontSize: 14 }}>{`Os prêmios podem ser utilizazados apenas uma única vez.\n\nÉ possível utilizar vários prêmios em um único pedido.\n\nPara utilizar o prêmio, basta pedir para o atendente do estabelecimento na hora de efetuar o pedido.\n\nFique atento para o prazo de utilização do prêmio para não perdê-lo.`}</Text>
        </Modal>
      }
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

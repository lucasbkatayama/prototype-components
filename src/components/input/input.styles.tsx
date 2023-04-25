import { Animated } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
    position: relative;
`

export const TextInput = styled.TextInput`
    height: 64px;
    width: 100%;
    background-color: #F2F2F2;
    border-radius: 4px;
    padding-left: 16px;
    padding-top: 12px;
    font-size: 20px;
    color: ${({ editable }) =>  editable === false ? '#828282' : '#2F80ED'};
`

type AnimatedLabelType = {
    editable: boolean | undefined
}

export const AnimatedLabel = styled(Animated.Text)<AnimatedLabelType>`
    color: ${({ editable }) =>  editable === false ? '#828282' : '#2F80ED'};
    font-size: 12px;
`

export const LabelContainer = styled.TouchableOpacity`
    position: absolute;
    left: 16px;
    top: 20px;
`
import { Animated } from 'react-native'
import styled from 'styled-components/native'

export const AnimatedOverlay = styled(Animated.View)`
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    background-color: #2b4369;
    zIndex: 1
`

export const AnimatedContainer = styled(Animated.View)`
    position: absolute;
    bottom: 0;
    justify-content: flex-end;
    zIndex: 2;
    width: 100%;
    background-color: white;
    border-top-end-radius: 15px;
    border-top-start-radius: 15px;
    padding-horizontal: 25px;
    padding-top: 20px;
    padding-bottom: 80px;
`

export const CloseButton = styled.TouchableOpacity`
    margin-bottom: 20px; 
    align-self: flex-end;
`
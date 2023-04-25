import { Animated } from 'react-native'
import styled from 'styled-components/native'

export const AnimatedContainer = styled(Animated.View)`
    position: absolute;
    top: -100px;
    width: 100%;
    padding-horizontal: 25px;
`

export const ContentContainer = styled.View`
    padding: 15px;
    background-color: #27AE60;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    shadow-color: #000;
    shadow-offset-width: 0;
    shadow-offset-height: 2px;
    shadow-opacity: 0.25;
    shadow-radius: 5px;
    elevation: 5;
    border-radius: 5;
`

export const Title = styled.Text`
    font-weight: bold; 
    font-size: 14px; 
    color: #fff; 
    margin-bottom: 5px;
`

export const Text = styled.Text`
    font-size: 12px; 
    color: #fff; 
`

export const TextContainer = styled.View`
    flex: 1;
    padding-right: 10px;
`
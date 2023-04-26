import { Animated } from 'react-native'
import styled from 'styled-components/native'

export const AnimatedWrapper = styled(Animated.View)`
    position: absolute;
    top: -300px;
    width: 100%;
    padding-horizontal: 20px;
`

type ContentContainerType = {
    type?: 'error' | 'warn' | 'success'
}

export const Container = styled.View<ContentContainerType>`
    background-color: ${({ type }) => {
        switch (type) {
            case 'error':
                return '#EB5757'
            case 'warn':
                return '#FFC71C'
            default:
                return '#27AE60'
        }
    }};
    shadow-color: #000;
    shadow-offset-width: 0;
    shadow-offset-height: 2px;
    shadow-opacity: 0.25;
    shadow-radius: 5px;
    elevation: 5;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`

export const ContentContainer = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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

export const LoadingBar = styled(Animated.View)`
    height: 6px;
    background-color: #000;
    opacity: 0.25;
`
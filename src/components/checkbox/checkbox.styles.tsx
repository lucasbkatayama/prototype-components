import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row; 
    width: 100%; 
    justify-content: space-between;
    align-items: center;
`

export const BoxContainer = styled.View`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    border-width: 1px,
    border-color: #2F80ED;
    overflow: hidden;
`

export const AnimatedBox = styled(Animated.View)`
    background-color: #2F80ED;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`
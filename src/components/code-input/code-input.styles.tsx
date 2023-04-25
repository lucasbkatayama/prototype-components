import styled, { css } from 'styled-components/native'

export const Container = styled.Pressable`
    flexDirection: row;
    justify-content: space-between;
    width: 100%;
`

export const HiddenInput = styled.TextInput`
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
`

type FakeInputBoxType = {
    isFocused: boolean
}

const FocusedStyle = css`
    shadow-color: #2F80ED;
    shadow-offset-width: 0;
    shadow-offset-height: 0;
    shadow-opacity: 0.8;
    shadow-radius: 4px;
`

export const FakeInputBox = styled.View<FakeInputBoxType>`
    alignItems: center;
    justify-content: center;
    border-radius: 4px;
    height: 80px;
    width: 60px;
    background-color: #F2F2F2;
    ${({ isFocused }) => isFocused ? FocusedStyle : null}
`

export const FakeInputText = styled.Text`
    font-size: 28px;
    font-weight: 500;
    color: #2F80ED;
    font-family: Menlo-Regular;
`
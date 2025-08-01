import styled from 'styled-components'



export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${props => props.theme['gray-100']};
    font-size: 1.125rem;
    font-weight: bold; 
    flex-wrap: wrap;
    
`;
const BaseInput = styled.input`
    background-color: transparent;
    height: 2.5rem;
    border: none;
    border-bottom: 2px solid ${props => props.theme['gray-500']};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${props => props.theme['gray-100']};

        &:focus{
        box-shadow: none;
        border-color: ${props => props.theme['green-500']};
        }

        &::placeholder{
        color: ${props => props.theme['gray-500']};
    }

`
export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-webkit-calendar-picker-indicator {
        display: none !important;
        }

        &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const MinutesAmountInput = styled(BaseInput)`
        &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }

    width: 4rem;
    text-align: center;
    appearance: textfield;
    -moz-appearance: textfield;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

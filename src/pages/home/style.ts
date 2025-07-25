import styled from 'styled-components';

export const HomeCantainer = styled.main`
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`;

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

export const CountdownContainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${props => props.theme['gray-100']};

    display: flex;
    gap: 1rem;

    span{
        background-color:${props => props.theme['gray-700']};
        padding: 2rem 1rem;
        border-radius: 8px
    }
`;

export const Separator = styled.div`
    padding: 2rem 0;
    color: ${props => props.theme['green-500']};
    
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`;

export const BseCountdownButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;
    color: ${props => props.theme['gray-100']};

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const StartCountdownButton = styled(BseCountdownButton)`
    
    background: ${props => props.theme['green-500']};

        &:not(:disabled):hover{
        background: ${props => props.theme['green-700']};
        transition: background-color 0.2s;
    }
`;

export const StopCountdownButton = styled(BseCountdownButton)`
        background: ${props => props.theme['red-500']};
        
        &:not(:disabled):hover{
        background: ${props => props.theme['red-700']};
        transition: background-color 0.2s;
        }
`;
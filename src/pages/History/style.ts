import styled from 'styled-components';

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.2rem;
    display: flex;
    flex-direction: column;

    h1{
        font-size: 1.5rem;
        color: ${props => props.theme['gray-100']};
    }
`;

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;//isso faz com que a lista de histórico fique rolável se o conteúdo for maior que a tela
    margin-top: 2rem;

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        th {
            text-align: left;
            font-size: 0.875rem;
            line-height: 1.6;
            padding: 1rem;

            background-color: ${props => props.theme['gray-600']};
            color: ${props => props.theme['gray-100']};


            &:first-child  {
                width: 50%;
                border-top-left-radius: 8px;
                padding-left: 1.6rem;
            }
            &:last-child  {
                border-top-right-radius: 8px;
                padding-right: 1.6rem;
            }
        }


        td {
            background-color: ${props => props.theme['gray-700']};
            padding: 1rem;
            border-top: 4px solid ${props => props.theme['gray-800']};
            color: ${props => props.theme['gray-300']};
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child  {
                padding-left: 1.6rem;
            }
            &:last-child  {
                padding-right: 1.6rem;
            }
        }
    }
`;

interface StatusProps {
    statusColor: keyof typeof STATUS_COLORS; //keyof typeof STATUS_COLORS faz com que o statusColor só possa ser uma das chaves do objeto STATUS_COLORS
}
const STATUS_COLORS = {
    yellow: 'yellow-500',
    red: 'red-500',
    green: 'green-500',
}as const; //as const faz com que o objeto seja um objeto literal, ou seja, as chaves não podem ser alteradas

export const Status = styled.span< StatusProps >`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: ${props => props.theme[STATUS_COLORS[props.statusColor]]};//pega a cor do objeto STATUS_COLORS de acordo com o statusColor passado como prop
    }
`;
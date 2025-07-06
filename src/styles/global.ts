import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: ${props => props.theme['gray-900']};
    color:  ${props => props.theme['gray-300']};
    -webkit-font-smoothing: antialiased;
}

body, input, textarea, button {
    font: 400 1rem 'Roboto', sans-serif;
    
}
`;
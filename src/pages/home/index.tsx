import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeCantainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./style";
//import { Form } from "react-router-dom";

export function Home() {
    return (
        <HomeCantainer>
            <form action="">

                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task" placeholder=" Dê um nome para sua tarefa " autoComplete="off"/>

                    <label htmlFor="minutesAmount">Durante</label>
                    <MinutesAmountInput type="number" id="minutesAmount" placeholder="00"/>
                    <span>minutos.</span>
                </FormContainer>


                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeCantainer>
    );
}
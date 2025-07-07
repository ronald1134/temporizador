import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeCantainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./style";
//import { Form } from "react-router-dom";

export function Home() {
    return (
        <HomeCantainer>
            <form action="">

                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task" list="Task-suggestions" placeholder=" Dê um nome para sua tarefa " autoComplete="off" />

                    <datalist id="Task-suggestions">
                        <option value="Projeto 1"></option>
                        <option value="Projeto 2"></option>
                        <option value="Projeto 3"></option>
                    </datalist>
                    <label htmlFor="minutesAmount">Durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5} //definição de incremento
                        min={5} //definição de valor mínimo
                        max={60} //definição de valor máximo
                        autoComplete="off"
                    />

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
import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useState } from "react";

import {
    CountdownContainer,
    FormContainer,
    HomeCantainer,
    MinutesAmountInput,
    Separator,
    StartCountdownButton,
    TaskInput
} from "./style";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
}


export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    // Configuração do react-hook-form
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    })

    function handleCreateNewCycle(data:NewCycleFormData) {
        const id = String(new Date().getTime()); 
        const newCycle: Cycle = {
            id, 
            task: data.task,
            minutesAmount: data.minutesAmount,
        }

        setCycles(state => [...state, newCycle]); // Atualiza o estado com o novo ciclo
        setActiveCycleId(id); // Define o ID do ciclo ativo
        reset(); // Reseta os campos do formulário após o envio
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId); // Busca o ciclo ativo pelo ID
    console.log(activeCycle);

    const task = watch('task'); // Observa o campo 'task' para reatividade
    const isSubmitDisabled = !task; // Desabilita o botão se 'task' estiver vazio

    return (
        <HomeCantainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        list="Task-suggestions"
                        placeholder=" Dê um nome para sua tarefa "
                        autoComplete="off"
                        {...register('task')} // Registro do campo de tarefa no react-hook-form
                    />

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
                        {...register('minutesAmount', { valueAsNumber: true })} // Registro do campo de minutos no react-hook-form
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

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeCantainer>
    );
}
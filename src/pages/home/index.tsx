import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns';// Importa a função para calcular a diferença em segundos entre duas datas

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

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
}


export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);// Estado para controlar os segundos passados

    // Configuração do react-hook-form
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    })
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    useEffect(() => {
        if (activeCycle) {
            setInterval(() => {
                setAmountSecondsPassed(differenceInSeconds(new Date(), new Date(activeCycle.startDate))) // Atualiza os segundos passados com base no ciclo ativo
            }, 1000)
        }
    }, [activeCycle]); // Efeito para monitorar mudanças no ciclo ativo

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles(state => [...state, newCycle]); // Atualiza o estado com o novo ciclo
        setActiveCycleId(id); // Define o ID do ciclo ativo
        reset(); // Reseta os campos do formulário após o envio
    }

    // Busca o ciclo ativo pelo ID
    console.log(activeCycle);

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // Calcula o total de segundos do ciclo ativo
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // Calcula os segundos restantes

    const minutesAmount = Math.floor(currentSeconds / 60); // Converte segundos restantes em minutos
    const secondsAmount = currentSeconds % 60; // Obtém os segundos restantes

    const minutes = String(minutesAmount).padStart(2, '0'); // Formata os minutos para ter dois dígitos
    const seconds = String(secondsAmount).padStart(2, '0'); // Formata

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
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeCantainer>
    );
}
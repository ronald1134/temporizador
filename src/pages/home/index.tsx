import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import {
    HomeCantainer,
    StartCountdownButton,
    StopCountdownButton
} from "./style";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    })

    const { handleSubmit, watch, reset } = newCycleForm
    const task = watch('task'); // Observa o campo 'task' para reatividade
    const isSubmitDisabled = !task; // Desabilita o botão se 'task' estiver vazio

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    return (
        <HomeCantainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24} />
                        interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeCantainer>
    );
}
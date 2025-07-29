import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const {register} = useFormContext()

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                list="Task-suggestions"
                placeholder=" Dê um nome para sua tarefa "
                autoComplete="off"
                disabled={!!activeCycle}
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
                step={1} //definição de incremento
                min={1} //definição de valor mínimo
                max={60} //definição de valor máximo
                autoComplete="off"
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })} // Registro do campo de minutos no react-hook-form
            />
            
            <span>minutos.</span>
        </FormContainer>
    )
}
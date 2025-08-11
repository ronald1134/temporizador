import { createContext, useState, type ReactNode, useReducer, useEffect } from "react";
import { cyclesReducer, type Cycle } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface createCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: createCycleData) => void
    interruptCurrentCycle: () => void
}
// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContexProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContexProviderProps) {

    const [cyclesState, dispatch] = useReducer(
        cyclesReducer,
        {
            cycles: [],
            activeCycleId: null,
        },
        (initialState) => {
            const storedStateAsJSON = localStorage.getItem(
                '@ignite-timer:cycles-state-1.0.0'
            )

            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON)
            }

            return initialState // <-- Corrigido aqui!
        },
    )
    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
        }

        return 0
    });// Estado para controlar os segundos passados

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);
        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON);
    }, [cyclesState])

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function createNewCycle(data: createCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle));
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction());
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
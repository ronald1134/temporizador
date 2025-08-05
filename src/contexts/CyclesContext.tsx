import { createContext, useState, type ReactNode, useReducer } from "react";
import { cyclesReducer, type Cycle } from "../reducers/cycles/reducer";
import { addNewCycleAction, interrptCurrentCycleAction } from "../reducers/cycles/actions";
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
    interrptCurrentCycle: () => void
}
// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContexProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContexProviderProps) {

    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null,
    },
    )

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);// Estado para controlar os segundos passados

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinished())
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

    function interrptCurrentCycle() {
        dispatch(interrptCurrentCycleAction());
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
                interrptCurrentCycle
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
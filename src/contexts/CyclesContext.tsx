import { createContext, useState, type ReactNode, useReducer } from "react";

interface createCycleData {
    task: string
    minutesAmount: number
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
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


interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}


export function CyclesContextProvider({ children }: CyclesContexProviderProps) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
        console.log('action', action)
        console.log('state', state)
        if (action.type === 'ADD_NEW_CYCLE') {
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id,
            }
        }

        if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
            return {
                ...state,
                cycles: [state.cycles.map(cyle => {
                    if (cyle.id === state.activeCycleId) {
                        return { ...cyle, interruptedDate: new Date() }; // Marca o ciclo como interrompido
                    } else {
                        return cyle; // Retorna o ciclo inalterado se não for o ativo
                    }
                })],
                activeCycleId: null,    
            }
        }

        return state
    }, {
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
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId,
            },
        })


        // setCycles(state =>
        //     state.map(cycle => {
        //         if (cycle.id === activeCycleId) {
        //             return { ...cycle, finishedDate: new Date() };
        //         } else {
        //             return cycle; // Retorna o ciclo inalterado se não for o ativo
        //         }
        //     }),
        // )
    }

    function createNewCycle(data: createCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle,
            },
        })
        // setCycles(state => [...state, newCycle]); // Atualiza o estado com o novo ciclo
        setAmountSecondsPassed(0); // Reseta os segundos passados
    }

    function interrptCurrentCycle() {
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload: {
                activeCycleId,
            },
        })

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
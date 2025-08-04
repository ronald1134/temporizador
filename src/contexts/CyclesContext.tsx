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

    const [cyclesState, dispatch] = useReducer(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state: CyclesState, action: any) => {
            switch (action.type) {
                case 'ADD_NEW_CYCLE':
                    return {
                        ...state,
                        cycles: [...state.cycles, action.payload.newCycle],
                        activeCycleId: action.payload.newCycle.id,
                    }

                case 'INTERRUPT_CURRENT_CYCLE': return {
                    ...state,
                    cycles: [state.cycles.map(cyle => {
                        if (cyle.id === state.activeCycleId) {
                            return { ...cyle, interruptedDate: new Date() };
                        } else {
                            return cyle;
                        }
                    })],
                    activeCycleId: null,
                }

                case 'MARK_CURRENT_CYCLE_AS_FINISHED':
                    return {
                        ...state,
                        cycles: state.cycles.map(cycle => {
                            if (cycle.id === action.payload.activeCycleId) {
                                return { ...cycle, finishedDate: new Date() }; // Marca o ciclo como finalizado
                            } else {
                                return cycle; // Retorna o ciclo inalterado se não for o ativo
                            }
                        }),
                        activeCycleId: null, // Reseta o ciclo ativo
                    }
                default:
                    return state;
            }
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
        setAmountSecondsPassed(0);
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
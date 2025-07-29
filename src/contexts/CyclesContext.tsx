import { createContext, useState, type ReactNode } from "react";

interface createCycleData{
    task:string
    minutesAmount:number
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
    cycles: Cycle []
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: ( data: createCycleData ) => void
    interrptCurrentCycle: () => void
}
// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContexProviderProps{
    children: ReactNode
}

export function CyclesContextProvider( {children } : CyclesContexProviderProps ) {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);// Estado para controlar os segundos passados

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        setCycles(state =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() };
                } else {
                    return cycle; // Retorna o ciclo inalterado se não for o ativo
                }
            }),
        )
    }

    function createNewCycle(data: createCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles(state => [...state, newCycle]); // Atualiza o estado com o novo ciclo
        setActiveCycleId(id); // Define o ID do ciclo ativo
        setAmountSecondsPassed(0); // Reseta os segundos passados
    }

    function interrptCurrentCycle() {

        setCycles(state =>
            state.map(cyle => {
                if (cyle.id === activeCycleId) {
                    return { ...cyle, interruptedDate: new Date() }; // Marca o ciclo como interrompido
                } else {
                    return cyle; // Retorna o ciclo inalterado se não for o ativo
                }
            }),
        )
        setActiveCycleId(null) // Reseta o ciclo ativo
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
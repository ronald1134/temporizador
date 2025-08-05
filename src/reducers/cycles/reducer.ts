import { ActionTypes } from "./actions";

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}




export function cyclesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id,
            }

        case ActionTypes.INTERRUPT_CURRENT_CYCLE: return {
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

        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
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
}
import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../..";

export function Countdown() {
    const { activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed
    } = useContext(CyclesContext) //utlizando context API para facilitar compatilhamento de informações

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // Calcula o total de segundos do ciclo ativo

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate
                )
                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    setSecondsPassed(totalSeconds) // Marca o tempo total como passado
                    clearInterval(interval);
                } else {
                    setSecondsPassed(secondsDifference) // Atualiza os segundos passados com base no ciclo ativo
                }
            }, 1000)
        }
        return () => {
            clearInterval(interval);
        }

    }, [activeCycle, activeCycleId, totalSeconds, markCurrentCycleAsFinished, setSecondsPassed]); // Efeito para monitorar mudanças no ciclo ativo


    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // Calcula os segundos restantes
    const minutesAmount = Math.floor(currentSeconds / 60); // Converte segundos restantes em minutos
    const secondsAmount = currentSeconds % 60; // Obtém os segundos restantes
    const minutes = String(minutesAmount).padStart(2, '0'); // Formata os minutos para ter dois dígitos
    const seconds = String(secondsAmount).padStart(2, '0'); // Formata

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`; // Atualiza o título da página com o tempo restante
        }
    }, [minutes, seconds, activeCycle]); // Efeito para monitorar mudanças nos minutos e segundos


    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}

// function setCycles(arg0: (state: any) => any) {
//     throw new Error("Function not implemented.");
// }

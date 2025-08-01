import { useContext } from "react";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { HistoryContainer, HistoryList, Status } from "./style";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History() {
    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <HistoryList>
                <table>
                    <caption>Histórico de tarefas</caption>

                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cycles.map(cycle => {
                            return (
                                <tr key={cycle.id}>
                                    <td> {cycle.task} </td>
                                    <td> {cycle.minutesAmount} minutos </td>
                                    <td> {formatDistanceToNow (cycle.startDate,{// uma formatação de data
                                        addSuffix:true,
                                        locale: ptBR,
                                    })} 
                                    </td>

                                    <td>
                                        {cycle.finishedDate && (
                                            <Status statusColor="green">Concluído</Status>
                                        )}

                                        {cycle.interruptedDate && (
                                            <Status statusColor="red">Interrompido</Status>
                                        )}

                                        {(!cycle.finishedDate && !cycle.interruptedDate) &&  (
                                            <Status statusColor="yellow">Em andamento</Status>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </HistoryList>
        </HistoryContainer>
    );
}
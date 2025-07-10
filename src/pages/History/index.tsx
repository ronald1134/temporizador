import { HistoryContainer, HistoryList, Status } from "./style";

export function History() {
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
                        <tr>
                            <td>Fazer tarefas da faculdades</td>
                            <td>20 minutos</td>
                            <td>Há 1 meses</td>
                            <td><Status statusColor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>Ir para academia</td>
                            <td>60 minutos</td>
                            <td>hoje</td>
                            <td><Status statusColor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>Estudar PHP</td>
                            <td>50 minutos</td>
                            <td>Há 2 semanas</td>
                            <td><Status statusColor="yellow">Em andamento</Status></td>
                        </tr>
                        <tr>
                            <td>editar vídeo</td>
                            <td>60 minutos</td>
                            <td>Há 1 meses</td>
                            <td><Status statusColor="red">Interrompido</Status></td>
                        </tr>
                        <tr>
                            <td>Refazer o portifólio em tsx</td>
                            <td>60 minutos</td>
                            <td>Há 4 meses</td>
                            <td><Status statusColor="yellow">Em andamento</Status></td>
                        </tr>
                        {/* <tr>
                            <td>tell costa to fuck off</td>
                            <td>1 minuto</td>
                            <td>Há 7 meses</td>
                            <td><Status statusColor="yellow">Em andamento</Status></td>
                        </tr> */}
                    </tbody>

                </table>
            </HistoryList>
        </HistoryContainer>
    );
}
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./style";

export function DefaultLayout() {/*esse componente será o layout padrão da aplicação,
                                que será utilizado em todas as páginas*/
                                //ele renderiza o Header e o Outlet, que é onde as rotas serão renderizadas
    return (
        <div>
            <LayoutContainer>
                <Header />
                <Outlet />
            </LayoutContainer>
        </div>
    );
}
import { HeaderContainer } from "./style";
import LogoIgnite from '../../assets/Logo-ignite.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from "react-router-dom";
export function Header() {
    return (
        <HeaderContainer>
            <img src={LogoIgnite} />
            <nav>
                <NavLink to="/">
                    <Timer size={24} />
                </NavLink>

                <NavLink to="/history">
                    <Scroll size={25}/>
                </NavLink>

            </nav>
        </HeaderContainer>
    );
}
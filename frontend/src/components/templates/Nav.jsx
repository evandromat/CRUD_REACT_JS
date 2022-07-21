import './Nav.css'
import Menu from './Menu'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Menu href='/' icon='home' titulo='Início'></Menu>
            <Menu href='/users' icon='users' titulo='Usuários'></Menu>
        </nav>
    </aside>
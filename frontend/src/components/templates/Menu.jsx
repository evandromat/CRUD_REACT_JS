import './Menu.css'
import React from 'react'
import { Link } from 'react-router-dom'
export default props =>
    <Link to ={props.href} className='menu-item'>
        <i className={`fa fa-${props.icon}`}></i>{props.titulo}
    </Link>



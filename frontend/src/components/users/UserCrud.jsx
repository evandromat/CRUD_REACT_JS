import React from "react";
import axios from 'axios'
import { Component } from "react";
import Main from "../templates/Main";
import CONSTS from '../../constants/Constants'



export default class UserCrud extends Component {
    state = { ...CONSTS.initialState }
    componentDidMount() {
        axios(CONSTS.baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
    clear() {
        this.setState({ user: CONSTS.initialState.user })
    }
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${CONSTS.baseUrl}/${user.id}` : CONSTS.baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: CONSTS.initialState.user, list })
            })
    }
    load(user) {
        this.setState({user})

        

    }

    remove(user) {
         axios.delete(`${CONSTS.baseUrl}/${user.id}`)
            .then(resp=>{
                const list = this.state.list.filter(u=>u!==user)
                this.setState({list})
            })

    }
    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }

    updateFild(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }
    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-success"  onClick={e => this.load(user)}>
                            <i className="fa fa-pencil" ></i>
                        </button>
                        <button className="btn btn-danger"  onClick={e => this.remove(user)}>
                            <i className="fa fa-trash" ></i>
                        </button>
                    </td>
                </tr>
            )
        })

    }
    renderTable() {
        return (
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" className='form-control' name='name' value={this.state.user.name} onChange={e => this.updateFild(e)} placeholder='Digite o nome...' />

                        </div>
                    </div>
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="text" className='form-control' name='email' value={this.state.user.email} onChange={e => this.updateFild(e)} placeholder='Digite o E-mail...' />

                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
                        <button className='btn btn-secondary ms-2' onClick={e => this.clear(e)}>Cancelar</button>
                    </div>
                </div>
            </div>

        )

    }
    render() {

        return (
            <Main {...CONSTS.headerProps} >
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
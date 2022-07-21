const CONSTS = {
    headerProps: {
        icon: 'users',
        title: 'Usuários',
        subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'

    },
    initialState: {
        user: { name: '', email: '' },
        list: []
    },
    baseUrl: 'http://localhost:3001/users'
    
}
export default CONSTS
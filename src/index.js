const express = require('express');
const userApi = require('./api/user');
const postagemApi = require('./api/postagem'); 
const database = require('./config/database');
const { User } = require('./model/user');
const { listarPostagem } = require('./controller/postagem');

console.log('Starting server....');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ response: 'Hello World!' });
});

app.post('/login', userApi.login);
app.post('/users', userApi.criarUsuario);


// Aplica a validação do token para as rotas abaixo
app.use(userApi.validarToken);
app.get('/users', userApi.listarUsuario);
app.put('/users/:id', userApi.alterarUsuario);
app.delete('/users/:id', userApi.deletarUsuario);

// Rotas para gerenciamento de postagens
app.post('/postagens', postagemApi.criarPostagem);
app.get('/postagens',postagemApi.listarPostagem);
app.put('/postagens/:id', postagemApi.alterarPostagem);
app.delete('/postagens/:id', postagemApi.deletarPostagem);
app.get('/postagens/autor/:autorId', postagemApi.buscarPorAutorId);

database.sync({ force: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });

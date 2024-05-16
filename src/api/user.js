const controller = require('../controller/user');

class userApi
{
    async criarUsuario(req, res) {
        const nome = req.body.nome;
        const email = req.body.email;
        const senha = req.body.senha;
       

        try {
            const user = await controller.criarUsuario(nome,email,senha);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarUsuario(req, res) {
        const { id } = req.params;
        const { nome,email,senha } = req.body;

        try {
            const user = await controller.alterarUsuario(Number(id), nome,email,senha);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarUsuario(req, res) {
        const { id } = req.params;

        try {
            await controller.deletarUsuario(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
async listarUsuario(req,res)
{

    try {
        const usuarios = await controller.listarUsuarios();
        return res.status(200).send(usuarios);
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
}

async login (req,res)
{
    try {
        const {nome,email,senha}=req.body;
        const token =await controller.login(nome,email,senha);
        return res.status(200).send(token);
    } catch (error) {
        return res.status(400).send({error:error.message});
    }
}
async validarToken (req,res,next)
{
    const token = req.headers.authorization;

    try {
        await controller.validaToken(token);
        next();
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
}
        
    }

module.exports = new userApi;
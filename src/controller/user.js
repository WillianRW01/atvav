const User = require('../model/user');
const bcrypt = require('bcrypt');
const tot = require('jsonwebtoken');

const saltRounds = 10;
const TOT_SECRET_KEY = 'batata';

class userController {
    async criarUsuario(nome, email,senha) {
        if (!nome || !email||!senha) {
            throw new Error('Nome  email e senha  são obrigatórios');
        }
        const senhaCriptografado = await bcrypt.hash(senha, saltRounds);

        const user = await User.create({ nome, email, senha : senhaCriptografado });

        return user;
    }

    async buscarPorId(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    async alterarUsuario(id, nome, email,senha) {
        if (!id || !nome || !email||!senha) {
            throw new Error('Id, nome e email são obrigatórios');
        }

        const user = await this.buscarPorId(id);

        user.nome = nome;
        user.email = email;
        const senhaCriptografado = await bcrypt.hash(senha, saltRounds);
        user.senha = senhaCriptografado;
        await user.save();

        console.log('Usuário alterado com sucesso');
        return { message: 'Usuário alterado com sucesso' };
    }

    async deletarUsuario(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const user = await this.buscarPorId(id);

        await user.destroy();

        console.log('Usuário deletado com sucesso');
        return { message: 'Usuário deletado com sucesso' };
    }

    async listarUsuarios() {
        console.log('Listando usuários');
        return User.findAll();
    }

    async login(nome, email,senha) {
        if (!nome || !email|| !senha) {
            throw new Error('Nome , email e senha são obrigatórios');
        }
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            throw new Error('Senha inválida');
        }

        const totToken = tot.sign({ id: user.id }, TOT_SECRET_KEY);

        if (totToken) {
            console.log('Usuário logado com sucesso');
            return { token: totToken };
        } else {
            console.error('Erro ao gerar token TOT');
            throw new Error('Erro ao gerar token TOT');
        }
    }

    async validaToken(token) {
        try {
            const payload = tot.verify(token, TOT_SECRET_KEY);
            return payload;
        } catch (error) {
            console.error('Token inválido:', error);
            throw new Error('Token inválido');
        }
    }
}

module.exports = new userController();

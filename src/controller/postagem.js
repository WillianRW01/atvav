const postagem = require('../model/postagem');
const Postagem = require('../model/postagem');

class PostagemController {
    async criarPostagem(titulo, conteudo, autorId) {
        if (!titulo || !conteudo || !autorId) {
            throw new Error('Título, conteúdo e autorId são obrigatórios');
        }
        const postagem = await Postagem.create({ titulo, conteudo, autorId });

        return postagem;
    }

    async alterarPostagem(id, titulo, conteudo) {
        if (!id || !titulo || !conteudo) {
            throw new Error('Id, título e conteúdo são obrigatórios');
        }
        const postagem = await Postagem.findByPk(id);
        if (!postagem) {
            throw new Error('Postagem não encontrada');
        }

        postagem.titulo = titulo;
        postagem.conteudo = conteudo;
        await postagem.save();

        return postagem;
    }
async listarPostagem()
{
    console.log('Listando postagens');
    return postagem.findAll();
}
    async deletarPostagem(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }
        const postagem = await Postagem.findByPk(id);
        if (!postagem) {
            throw new Error('Postagem não encontrada');
        }

        await postagem.destroy();

        return { message: 'Postagem deletada com sucesso' };
    }

    async buscarPorAutorId(autorId) {
        if (!autorId) {
            throw new Error('AutorId é obrigatório');
        }
        const postagens = await Postagem.findAll({ where: { autorId } });

        return postagens;
    }
}

module.exports = new PostagemController();

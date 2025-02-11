import { ModeloFavorito } from '../bd/Modelos.js';

// Funções relacionadas aos favoritos

// Função para adicionar um favorito
export const adicionarFavorito = async (req, res) => {
    const { item } = req.body;
    const userId = req.session.user._id;

    try {
        const novoFavorito = new ModeloFavorito({
            user: userId,
            item,
        });

        await novoFavorito.save();

        res.status(201).json({ message: 'Favorito adicionado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar favorito', error });
    }
};

// Função para remover um favorito
export const removerFavorito = async (req, res) => {
    const { itemName } = req.params;

    try {
        await ModeloFavorito.findOneAndDelete({ item: itemName });

        res.status(200).json({ message: 'Favorito removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover favorito', error });
    }
};

// Função para listar os favoritos de um usuário
export const listarFavoritos = async (req, res) => {
    const userId = req.session.user._id;

    try {
        const favoritos = await ModeloFavorito.find({ user: userId });

        res.status(200).json(favoritos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar favoritos', error });
    }
};

// Funções relacionadas aos comentários

// Função para adicionar um comentário a um favorito
export const adicionarComentario = async (req, res) => {
    const { favoritoId, text } = req.body;

    try {
        const favorito = await ModeloFavorito.findById(favoritoId);

        if (!favorito) {
            return res.status(404).json({ message: 'Favorito não encontrado' });
        }

        favorito.comments.push({ text });

        await favorito.save();

        res.status(201).json({ message: 'Comentário adicionado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar comentário', error });
    }
};

// Função para remover um comentário de um favorito
export const removerComentario = async (req, res) => {
    const { favoritoId, comentarioId } = req.params;

    try {
        const favorito = await ModeloFavorito.findById(favoritoId);

        if (!favorito) {
            return res.status(404).json({ message: 'Favorito não encontrado' });
        }

        favorito.comments.id(comentarioId).remove();

        await favorito.save();

        res.status(200).json({ message: 'Comentário removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover comentário', error });
    }
};

export const logado = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    next();
}
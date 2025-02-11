import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

export const criarUsuario = async (name, email, password) => {
    try {
        const response = await API.post('/criar', { name, email, password });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deletarUsuario = async (id) => {
    try {
        const response = await API.delete(`/deletar/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const logarUsuario = async (email, password) => {
    try {
        const response = await API.post('/login', { email, password });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const buscarSecao = async () => {
    try {
        const response = await API.get(`/secao`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const adicionarFavorito = async (userId, itemId) => {
    try {
        const response = await API.post('/adicionar', { userId, itemId });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const removerFavorito = async (userId, itemId) => {
    try {
        const response = await API.post('/remover', { userId, itemId });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const listarFavoritos = async (userId) => {
    try {
        const response = await API.get(`/favoritos/${userId}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const adicionarComentario = async (favoritoId, text) => {
    try {
        const response = await API.post('/comentario/adicionar', { favoritoId, text });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const removerComentario = async (favoritoId, comentarioId) => {
    try {
        const response = await API.delete(`/comentario/remover/${favoritoId}/${comentarioId}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
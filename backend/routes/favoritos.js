import { Router } from 'express';
import {
    adicionarFavorito,
    removerFavorito,
    listarFavoritos,
    adicionarComentario,
    removerComentario
} from '../controladores/FavController.js';

const router = Router();

router.post('/adicionar', adicionarFavorito);
router.delete('/remover/:id', removerFavorito);
router.get('/listar/:userId', listarFavoritos);
router.post('/comentario/adicionar', adicionarComentario);
router.delete('/comentario/remover/:favoritoId/:comentarioId', removerComentario);

/*

// JSON for testing adicionarFavorito
{
    "userId": "123",
    "itemId": "456"
}

// JSON for testing removerFavorito
{
    "id": "789"
}

// JSON for testing listarFavoritos
// No JSON body needed, just use the URL parameter

// JSON for testing adicionarComentario
{
    "favoritoId": "123",
    "comentario": "Este é um comentário de teste"
}

// JSON for testing removerComentario
{
    "favoritoId": "123",
    "comentarioId": "456"
}

*/

export default router;
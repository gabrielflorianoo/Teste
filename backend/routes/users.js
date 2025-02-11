import { Router } from 'express';
import {
  criarUsuario,
  deletarUsuario,
  logarUsuario,
  buscarSecao,
} from '../controladores/UserController.js';
const router = Router();

router.post('/criar', criarUsuario);
router.delete('/deletar/:id', deletarUsuario);
router.post('/login', logarUsuario);
router.get('/secao', buscarSecao);

/*

// JSON for testing the 'criar' route
{
  "method": "POST",
  "url": "http://localhost:3000/criar",
  "body": {
    "nome": "Gabriela",
    "email": "gabriela@example.com",
    "senha": "senha123"
  }
}

// JSON for testing the 'deletar' route
{
  "method": "DELETE",
  "url": "http://localhost:3000/deletar/1"
}

// JSON for testing the 'login' route
{
  "method": "POST",
  "url": "http://localhost:3000/login",
  "body": {
    "email": "gabriela@example.com",
    "senha": "senha123"
  }
}

*/

export default router;
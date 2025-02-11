import { Router } from 'express';
import {
  criarUsuario,
  deletarUsuario,
  logarUsuario,
  buscarSecao,
  deslogarUsuario,
} from '../controladores/UserController.js';
const router = Router();

router.post('/criar', criarUsuario);
router.delete('/deletar/:id', deletarUsuario);
router.post('/login', logarUsuario);
router.get('/secao', buscarSecao);
router.get('/logout', deslogarUsuario);

export default router;
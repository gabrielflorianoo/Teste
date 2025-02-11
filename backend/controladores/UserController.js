import { ModeloUsuario } from '../bd/Modelos.js';
import bcrypt from 'bcrypt';

// Função para criar um novo usuário
export const criarUsuario = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verifica se os campos foram fornecidos
        if (!name) {
            return res.status(400).json({ message: 'O campo name é obrigatório' });
        }
        if (!email) {
            return res.status(400).json({ message: 'O campo email é obrigatório' });
        }
        if (!password) {
            return res.status(400).json({ message: 'O campo password é obrigatório' });
        }

        // Verifica se o usuário já existe
        const usuarioExistente = await ModeloUsuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria um novo usuário
        const novoUsuario = new ModeloUsuario({
            name,
            email,
            password: hashedPassword,
        });

        // Salva o usuário no banco de dados
        await novoUsuario.save();

        // Adicionar usuário na sessão
        req.session.user = novoUsuario;

        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
};

// Função para deletar um usuário
export const deletarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        // Deleta o usuário pelo ID
        await ModeloUsuario.findByIdAndDelete(id);

        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
};

// Função para logar um usuário
export const logarUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await ModeloUsuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // Verifica a senha
        const senhaValida = await bcrypt.compare(password, usuario.password);
        if (!senhaValida) {
            return res.status(400).json({ message: 'Senha inválida' });
        }

        // Adicionar usuário na sessão
        req.session.user = usuario;

        res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao logar usuário', error });
    }
};

export const buscarSecao = (req, res) => {
    try {
        // Verifica se há um usuário na sessão
        if (req.session.user) {
            res.status(200).json({ user: req.session.user });
        } else {
            res.status(404).json({ message: 'Nenhum usuário logado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar sessão', error });
    }
};
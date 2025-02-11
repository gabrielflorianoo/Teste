import React, { createContext, useContext, useState, useEffect } from 'react';
import { criarUsuario, logarUsuario, deletarUsuario, buscarSecao, deslogarUsuario } from '../Backend/Servidor';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const pegarUsuario = async () => {
            try {
                const response = await buscarSecao();
                if (response.status === 200) {
                    setUser(response.data);
                }
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }

        pegarUsuario();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await logarUsuario(email, password);
            if (response.status === 200) {
                setUser(response.data);
            }
            setLoading(false);
            return response;
        } catch (err) {
            setError(err.response.data);
            setLoading(false);
        }
    };

    const logout = async () => {
        await deslogarUsuario();
        setUser(null);
    };

    const deletar = async (id) => {
        setLoading(true);
        try {
            await deletarUsuario(id);
            setUser(null);
            setLoading(false);
        } catch (err) {
            setError(err.response.data);
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        try {
            const response = await criarUsuario(name, email, password);

            if (response.status === 400) {
                // Campos faltando
                throw Error("Por favor, preencha todos os campos!");
            } else if (response.status === 499) {
                // Usuário já existe
                throw Error("Usuário já existe");
            }

            console.log("resposta: ", response);
            setUser(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.response.data);
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout, register, deletar }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
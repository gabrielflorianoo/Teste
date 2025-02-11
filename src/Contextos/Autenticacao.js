import React, { createContext, useContext, useState, useEffect } from 'react';
import { criarUsuario, logarUsuario, deletarUsuario } from '../Backend/Servidor';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await logarUsuario(email, password);
            setUser(response);
            setLoading(false);
        } catch (err) {
            setError(err.response.data);
            setLoading(false);
        }
    };

    const logout = () => {
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
            setUser(response);
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
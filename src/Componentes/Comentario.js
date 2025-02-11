import React, { useEffect, useState } from "react";
import { adicionarComentario, removerComentario, listarComentarios } from "../Backend/Servidor.js";

const Comentario = ({ favoritoId, comentarios }) => {
    const [text, setText] = useState("");
    const [comentariosList, setComentariosList] = useState(comentarios);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const response = await listarComentarios(favoritoId);
                setComentariosList(response);
            } catch (error) {
                console.error("Erro ao carregar comentários:", error);
            }
        };

        fetchComentarios();
    }, []);

    const handleAdicionarComentario = async () => {
        if (text.trim() === "") return;

        try {
            const response = await adicionarComentario(favoritoId, text);
            console.log(response);
            setComentariosList([...comentariosList, response.data]);
            setText("");
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
        }
    };

    const handleRemoverComentario = async (comentarioId) => {
        try {
            await removerComentario(favoritoId, comentarioId);
            setComentariosList(comentariosList.filter(c => c._id !== comentarioId));
        } catch (error) {
            console.error("Erro ao remover comentário:", error);
        }
    };

    return (
        <div className="comentarios">
            <h3>Comentários</h3>
            <ul>
                {comentariosList && comentariosList.length > 0 && comentariosList.map((comentario) => (
                    <li key={comentario._id}>
                        {comentario.text}
                        <button onClick={() => handleRemoverComentario(comentario._id)}>Remover</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Adicionar comentário"
            />
            <button onClick={handleAdicionarComentario}>Adicionar</button>
        </div>
    );
};

export default Comentario;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cabeca from "./Componentes/Cabeca";
import Footer from "./Componentes/Footer";
import Conteudo from "./Componentes/Conteudo";
import CategoryList from "./Componentes/CategoryList";
import RecipeList from "./Componentes/RecipeList";
import RecipeDetail from "./Componentes/RecipeDetail";
import Login from "./Componentes/Login";
import Register from "./Componentes/Register";
import Favoritos from "./Componentes/Favoritos";

function App() {
    return (
        <Router>
            <div className="App">
                <Cabeca />
                <Routes>
                    <Route path="/" element={<Conteudo />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registrar" element={<Register />} />
                    <Route path="/recipes" element={<CategoryList />} />
                    <Route path="/recipes/:category" element={<RecipeList />} />
                    <Route path="/recipe/:id" element={<RecipeDetail />} />
                    <Route path="/favoritos" element={<Favoritos />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

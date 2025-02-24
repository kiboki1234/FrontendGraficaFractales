import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Mandelbrot from "./components/MandelbrotViewer";
import Julia from "./components/JuliaViewer";
import Koch from "./components/KochViewer";
import Sierpinski from "./components/SierpinskiViewer";
import Tree from "./components/TreeViewer";
import Home from "./components/Home";
import Prism from "./components/Prism";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Router>
      <div className="container-fluid bg-dark text-light min-vh-100 d-flex flex-column">
        {/* 🔹 Navbar Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
          <div className="container">
            <a className="navbar-brand" href="/">Fractales</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">Inicio</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Mandelbrot" className="nav-link">Mandelbrot</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Julia" className="nav-link">Julia</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Koch" className="nav-link">Koch</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Sierpinski" className="nav-link">Sierpinski</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Tree" className="nav-link">Árbol</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/AnalisisMatematico" className="nav-link">Analisis matematico</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* 🔹 Contenido Principal */}
        <div className="container text-center py-5 flex-grow-1">
          <h1 className="display-4 fw-bold text-primary mb-4">Explora los Fractales</h1>
          <div className="card bg-secondary text-light p-4 shadow-lg">
            <Routes>
              <Route path="/" element={<Home />} />  {/* 🔹 Nueva Página de Inicio */}
              <Route path="/Mandelbrot" element={<Mandelbrot />} />
              <Route path="/Julia" element={<Julia />} />
              <Route path="/Koch" element={<Koch />} />
              <Route path="/Sierpinski" element={<Sierpinski />} />
              <Route path="/Tree" element={<Tree />} />
              <Route path="/AnalisisMatematico" element={<Prism />} />
            </Routes>
          </div>
        </div>

        {/* 🔹 Pie de Página */}
        <footer className="bg-primary text-light text-center py-3 mt-4">
          <p className="mb-0">
            <strong>Trabajo realizado por:</strong> Chiliquinga Yeshua, Espin Andres, Marin Josue, Salcedo Micaela
          </p>
          <p className="mb-0">
            <strong>Materia:</strong> Computación Gráfica
          </p>
        </footer>
      </div>
    </Router>
  );
}

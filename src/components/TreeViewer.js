import { useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TreeFractal() {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [depth, setDepth] = useState(5);
  const canvasRef = useRef(null);

  const fetchTree = useCallback(async () => {
    try {
      const start = JSON.stringify({ x: width / 2, y: height });
      const length = height / 3;
      const angle = Math.PI / 2;

      console.log(`Fetching Tree Fractal: start=${start}, length=${length}, angle=${angle}, depth=${depth}`);

      const response = await fetch(
        `https://backendgraficfractales.onrender.com/api/tree?start=${encodeURIComponent(start)}&length=${length}&angle=${angle}&depth=${depth}`
      );

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      drawTree(data.result);
    } catch (error) {
      console.error("Error fetching Tree Fractal:", error);
    }
  }, [width, height, depth]);

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);

  const drawTree = (branches) => {
    console.log("Segmentos recibidos:", branches);

    if (!branches || branches.length === 0) {
      console.error("No hay segmentos para dibujar.");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();

    branches.forEach(branch => {
      if (branch.length === 2) { 
        const [start, end] = branch;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
      } else {
        console.error("Segmento inválido:", branch);
      }
    });

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  return (
    <div className="container text-light py-5">
      <h1 className="text-center display-4 fw-bold text-warning text-center mb-3">Fractal de Árbol</h1>

      {/* 🔹 Formulario estilizado dentro de una card */}
      <div className="card bg-dark text-light shadow-lg p-4 mb-4">
        <div className="card-body">
          <h3 className="text-warning text-center mb-3">Configuración</h3>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Ancho</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
                className="form-control bg-secondary text-light"
                placeholder="Ancho"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Alto</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="form-control bg-secondary text-light"
                placeholder="Alto"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Profundidad</label>
              <input
                type="number"
                value={depth === "" ? "" : depth} // Permite borrar el input
                onChange={(e) => {
                  const newValue = e.target.value;

                  if (newValue === "") {
                    setDepth(""); // Permitir vacío temporalmente
                    return;
                  }

                  const newDepth = parseInt(newValue);

                  if (!isNaN(newDepth) && newDepth >= 0 && newDepth <= 20) {
                    setDepth(newDepth);
                  } else {
                    alert("La profundidad debe estar entre 0 y 20.");
                  }
                }}
                onBlur={() => {
                  if (depth === "") setDepth(0); // Si queda vacío, restablecer a 0
                }}
                className="form-control bg-secondary text-light"
                placeholder="Profundidad"
              />
            </div>
          </div>

          {/* 🔹 Botón estilizado */}
          <div className="text-center mt-4">
            <button onClick={fetchTree} className="btn btn-primary btn-lg px-4">
              Generar Árbol
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Canvas estilizado */}
      <div className="text-center">
        <canvas ref={canvasRef} width={width} height={height} className="border border-light shadow-lg rounded" />
      </div>
    </div>
  );
}

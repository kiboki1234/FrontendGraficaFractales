import { useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TreeFractal() {
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [depth, setDepth] = useState(5);
  const [color, setColor] = useState("#00ff00"); // Estado para el color de las ramas
  const canvasRef = useRef(null);

  // 🔹 Ajustar dinámicamente el tamaño del canvas según el tamaño de pantalla
  useEffect(() => {
    const updateCanvasSize = () => {
      const screenWidth = window.innerWidth;
      const newSize = screenWidth < 768 ? 300 : 500;
      setCanvasSize({ width: newSize, height: newSize });
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const fetchTree = useCallback(async () => {
    try {
      const start = JSON.stringify({ x: canvasSize.width / 2, y: canvasSize.height });
      const length = canvasSize.height / 3;
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
  }, [canvasSize, depth]);

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);

  const drawTree = (branches) => {
    if (!branches || branches.length === 0) {
      console.error("No hay segmentos para dibujar.");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.beginPath();

    const colorRGB = hexToRGB(color);

    branches.forEach((branch) => {
      if (branch.length === 2) {
        const [start, end] = branch;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
      } else {
        console.error("Segmento inválido:", branch);
      }
    });

    ctx.strokeStyle = `rgb(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const hexToRGB = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  return (
    <div className="container text-light py-5">
      <h1 className="text-center display-4 fw-bold text-warning mb-3">Fractal de Árbol</h1>

      <div className="card bg-dark text-light shadow-lg p-4 mb-4">
        <div className="card-body">
          <h3 className="text-warning text-center mb-3">Configuración</h3>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Profundidad</label>
              <input
                type="number"
                value={depth === "" ? "" : depth}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (newValue === "") {
                    setDepth("");
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
                  if (depth === "") setDepth(0);
                }}
                className="form-control bg-secondary text-light"
                placeholder="Profundidad"
              />
            </div>

            {/* 🔹 Selector de color */}
            <div className="col-md-6 text-center">
              <label className="form-label">Color de las ramas</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="form-control form-control-color"
                style={{ width: "60px", height: "40px" }}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button onClick={fetchTree} className="btn btn-primary btn-lg px-4">
              Generar Árbol
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Canvas ajustado dinámicamente */}
      <div className="d-flex justify-content-center">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="border border-light shadow-lg rounded canvas-responsive"
        />
      </div>

      {/* 🔹 CSS para hacer el canvas responsivo */}
      <style>
        {`
          .canvas-responsive {
            width: 100%;
            max-width: 500px;
            height: auto;
          }
        `}
      </style>
    </div>
  );
}

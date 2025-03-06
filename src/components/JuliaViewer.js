import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function JuliaSet() {
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [realC, setRealC] = useState(-0.7);
  const [imagC, setImagC] = useState(0.27015);
  const [maxIter, setMaxIter] = useState(100);
  const [color, setColor] = useState("#ff0000");
  const canvasRef = useRef(null);

  // 🔹 Ajustar tamaño del canvas dinámicamente según el tamaño de la pantalla
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

  const fetchJulia = async () => {
    try {
      const response = await fetch(
        `https://backendgraficfractales.onrender.com/api/julia?width=${canvasSize.width}&height=${canvasSize.height}&realC=${realC}&imagC=${imagC}&maxIter=${maxIter}`
      );
      const data = await response.json();
      drawJulia(data.data);
    } catch (error) {
      console.error("Error fetching Julia set:", error);
    }
  };

  const drawJulia = (fractalData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(canvasSize.width, canvasSize.height);

    const colorRGB = hexToRGB(color);

    for (let y = 0; y < canvasSize.height; y++) {
      for (let x = 0; x < canvasSize.width; x++) {
        const index = (y * canvasSize.width + x) * 4;
        const brightness = fractalData[y][x] === maxIter ? 0 : (fractalData[y][x] / maxIter) * 255;

        imageData.data[index] = brightness * (colorRGB.r / 255);
        imageData.data[index + 1] = brightness * (colorRGB.g / 255);
        imageData.data[index + 2] = brightness * (colorRGB.b / 255);
        imageData.data[index + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const hexToRGB = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  useEffect(() => {
    fetchJulia();
  }, [canvasSize, realC, imagC, maxIter, color]);

  return (
    <div className="container text-light py-5">
      <h1 className="text-center display-4 fw-bold text-warning mb-3">Conjunto de Julia</h1>

      <div className="card bg-dark text-light shadow-lg p-4 mb-4">
        <div className="card-body">
          <h3 className="text-warning text-center mb-3">Configuración</h3>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Iteraciones</label>
              <input
                type="number"
                value={maxIter}
                onChange={(e) => setMaxIter(parseInt(e.target.value))}
                className="form-control bg-secondary text-light"
                placeholder="Iteraciones"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Parte Real (C)</label>
              <input
                type="number"
                step="0.01"
                value={realC}
                onChange={(e) => setRealC(parseFloat(e.target.value))}
                className="form-control bg-secondary text-light"
                placeholder="Parte real de C"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Parte Imaginaria (C)</label>
              <input
                type="number"
                step="0.01"
                value={imagC}
                onChange={(e) => setImagC(parseFloat(e.target.value))}
                className="form-control bg-secondary text-light"
                placeholder="Parte imaginaria de C"
              />
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-md-12 text-center">
              <label className="form-label">Color del fractal</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="form-control form-control-color mx-auto"
                style={{ width: "60px", height: "40px" }}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button onClick={fetchJulia} className="btn btn-primary btn-lg px-4">
              Generar Fractal
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

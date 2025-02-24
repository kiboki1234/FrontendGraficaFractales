import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function JuliaSet() {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [realC, setRealC] = useState(-0.7);
  const [imagC, setImagC] = useState(0.27015);
  const [maxIter, setMaxIter] = useState(100);
  const canvasRef = useRef(null);

  const fetchJulia = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/julia?width=${width}&height=${height}&realC=${realC}&imagC=${imagC}&maxIter=${maxIter}`
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
    const imageData = ctx.createImageData(width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const brightness = fractalData[y][x] === maxIter ? 0 : (fractalData[y][x] / maxIter) * 255;
        imageData.data[index] = brightness;
        imageData.data[index + 1] = brightness;
        imageData.data[index + 2] = brightness;
        imageData.data[index + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  useEffect(() => {
    fetchJulia();
  }, [width, height, realC, imagC, maxIter]);

  return (
    <div className="container text-light py-5">
      <h1 className="text-center display-4 fw-bold text-warning text-center mb-3">Conjunto de Julia</h1>

      {/* 🔹 Formulario en una Card */}
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
              <label className="form-label">Iteraciones</label>
              <input
                type="number"
                value={maxIter}
                onChange={(e) => setMaxIter(parseInt(e.target.value))}
                className="form-control bg-secondary text-light"
                placeholder="Iteraciones"
              />
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-md-6">
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
            <div className="col-md-6">
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

          {/* 🔹 Botón estilizado */}
          <div className="text-center mt-4">
            <button onClick={fetchJulia} className="btn btn-primary btn-lg px-4">
              Generar Fractal
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Canvas para mostrar el fractal */}
      <div className="text-center">
        <canvas ref={canvasRef} width={width} height={height} className="border border-light shadow-lg rounded" />
      </div>
    </div>
  );
}

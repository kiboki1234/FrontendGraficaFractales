import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Mandelbrot() {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [maxIter, setMaxIter] = useState(100);
  const [color, setColor] = useState("#ff0000"); // Nuevo estado para el color
  const canvasRef = useRef(null);

  const fetchMandelbrot = async () => {
    try {
      const response = await fetch(
        `https://backendgraficfractales.onrender.com/api/mandelbrot?width=${width}&height=${height}&maxIter=${maxIter}`
      );
      const data = await response.json();
      drawMandelbrot(data.data);
    } catch (error) {
      console.error("Error fetching Mandelbrot set:", error);
    }
  };

  const drawMandelbrot = (fractalData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);

    const colorRGB = hexToRGB(color);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
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
    fetchMandelbrot();
  }, [width, height, maxIter, color]);

  return (
    <div className="container text-light py-5">
      <h1 className="text-center display-4 fw-bold text-warning text-center mb-3">Conjunto de Mandelbrot</h1>

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
              <label className="form-label">Iteraciones</label>
              <input
                type="number"
                value={maxIter}
                onChange={(e) => setMaxIter(parseInt(e.target.value))}
                className="form-control bg-secondary text-light"
                placeholder="Número de Iteraciones"
              />
            </div>
          </div>

          {/* 🔹 Selector de color */}
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

          {/* 🔹 Botón estilizado */}
          <div className="text-center mt-4">
            <button onClick={fetchMandelbrot} className="btn btn-primary btn-lg px-4">
              Generar Fractal
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

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";

const fractals = {
  julia: {
    name: "Conjunto de Julia",
    equation: "Z(n+1) = Z(n)^2 + C",
    explanation: "El conjunto de Julia se define mediante una función iterativa cuadrática sobre los números complejos.",
    theory: "Para cualquier número complejo C, el conjunto de Julia se forma evaluando si los valores de Z escapan a infinito bajo la transformación Z(n+1) = Z(n)^2 + C.",
    dimension: "La dimensión fractal varía entre 1.9 y 2.0, dependiendo del valor de C.",
    properties: [
      "Está relacionado con el conjunto de Mandelbrot.",
      "El patrón resultante depende del número complejo C.",
      "Es un ejemplo de fractal autosimilar y dependiente de condiciones iniciales."
    ],
    applications: [
      "Generación de gráficos fractales.",
      "Estudio del caos en sistemas dinámicos.",
      "Modelado de patrones en la naturaleza."
    ],
    formulaCode: `function julia(z, c, maxIter) {
  let n = 0;
  while (Math.sqrt(z.real * z.real + z.imag * z.imag) <= 2 && n < maxIter) {
    let real = z.real * z.real - z.imag * z.imag + c.real;
    let imag = 2 * z.real * z.imag + c.imag;
    z = { real, imag };
    n++;
  }
  return n;
}`
  },

  mandelbrot: {
    name: "Conjunto de Mandelbrot",
    equation: "Z(n+1) = Z(n)^2 + C, con Z0 = 0",
    explanation: "El conjunto de Mandelbrot es un fractal basado en la convergencia y divergencia de la función cuadrática iterada en los números complejos.",
    theory: "Para cada punto en el plano complejo, la ecuación Z(n+1) = Z(n)^2 + C se itera hasta que el valor de Z diverge.",
    dimension: "La dimensión fractal del conjunto de Mandelbrot se encuentra entre 1.9 y 2.0.",
    properties: [
      "Contiene copias autosimilares en cualquier nivel de zoom.",
      "Cada punto en el conjunto de Mandelbrot genera un conjunto de Julia único.",
      "Es un fractal dependiente de parámetros iniciales."
    ],
    applications: [
      "Visualización de sistemas caóticos.",
      "Modelado de estructuras fractales en computación gráfica.",
      "Exploración matemática en ecuaciones no lineales."
    ],
    formulaCode: `function mandelbrot(c, maxIter) {
  let z = { real: 0, imag: 0 };
  let n = 0;
  while (Math.sqrt(z.real * z.real + z.imag * z.imag) <= 2 && n < maxIter) {
    let real = z.real * z.real - z.imag * z.imag + c.real;
    let imag = 2 * z.real * z.imag + c.imag;
    z = { real, imag };
    n++;
  }
  return n;
}`
  },

  koch: {
    name: "Curva de Koch",
    equation: "Dimensión fractal Df ≈ log(4) / log(3) ≈ 1.26",
    explanation: "La curva de Koch se genera mediante una regla de reemplazo que transforma segmentos en estructuras triangulares.",
    theory: "Cada iteración divide un segmento en tres partes iguales y reemplaza la parte central con un triángulo sin base.",
    dimension: "La dimensión fractal de la curva de Koch es 1.26.",
    properties: [
      "Es un fractal autosimilar con un número infinito de iteraciones.",
      "Tiene una longitud infinita pero un área finita.",
      "Se puede construir a partir de reglas simples de geometría iterativa."
    ],
    applications: [
      "Modelado de líneas costeras en geografía.",
      "Diseño de antenas fractales.",
      "Generación de patrones en diseño gráfico."
    ],
    formulaCode: `function kochSegment(p1, p2, depth) {
  if (depth === 0) return [[p1, p2]];
  const [a, b, d] = kochPoints(p1, p2);
  return [
    ...kochSegment(p1, a, depth - 1),
    ...kochSegment(a, b, depth - 1),
    ...kochSegment(b, d, depth - 1),
    ...kochSegment(d, p2, depth - 1)
  ];
}`
  }
};

export default function MathAnalysis() {
  const [selectedFractal, setSelectedFractal] = useState("julia");

  useEffect(() => {
    Prism.highlightAll();
  }, [selectedFractal]);

  return (
    <div className="container text-light py-5">
      <h1 className="fw-bold text-primary mb-4">Análisis Matemático de Fractales</h1>

      <div className="card bg-dark text-light shadow-lg p-4 mb-4">
        <div className="card-body">
          <h3 className="text-warning">Selecciona un Fractal</h3>
          <select
            className="form-select bg-secondary text-light my-3"
            onChange={(e) => setSelectedFractal(e.target.value)}
            value={selectedFractal}
          >
            {Object.keys(fractals).map((key) => (
              <option key={key} value={key}>{fractals[key].name}</option>
            ))}
          </select>

          <h4 className="text-info">{fractals[selectedFractal].name}</h4>
          <h5 className="text-warning mt-4">Ecuación</h5>
          <p className="bg-secondary p-2 rounded">{fractals[selectedFractal].equation}</p>

          <h5 className="text-warning mt-4">Explicación</h5>
          <p>{fractals[selectedFractal].explanation}</p>

          <h5 className="text-warning mt-4">Teoría Matemática</h5>
          <p>{fractals[selectedFractal].theory}</p>

          <h5 className="text-warning mt-4">Dimensión Fractal</h5>
          <p>{fractals[selectedFractal].dimension}</p>

          <h5 className="text-warning mt-4">Propiedades</h5>
          <ul>
            {fractals[selectedFractal].properties.map((prop, index) => (
              <li key={index}>{prop}</li>
            ))}
          </ul>

          <h5 className="text-warning mt-4">Aplicaciones</h5>
          <ul>
            {fractals[selectedFractal].applications.map((app, index) => (
              <li key={index}>{app}</li>
            ))}
          </ul>

          <h5 className="text-warning mt-4">Código</h5>
          <pre className="rounded p-3 bg-secondary">
            <code className="language-javascript">{fractals[selectedFractal].formulaCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

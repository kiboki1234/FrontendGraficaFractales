export default function Home() {
    return (
      <div className="container text-center text-light py-5">
        
        {/* 🔹 Introducción a los Fractales */}
        <p className="lead">
          Un <strong>fractal</strong> es una estructura geométrica que exhibe autosimilitud en distintas escalas.  
          Se pueden encontrar en la naturaleza, en gráficos por computadora, en matemáticas y en la ciencia.
        </p>
  
        <div className="row justify-content-center">
          {/* 🔹 Sección Historia */}
          <div className="col-md-8">
            <div className="card bg-dark text-light mb-4">
              <div className="card-body">
                <h3 className="card-title text-warning">Historia de los Fractales</h3>
                <p className="card-text">
                  El concepto de fractales fue formalizado por el matemático <strong>Benoît Mandelbrot</strong> en los años 70.  
                  Sin embargo, matemáticos como <strong>Georg Cantor</strong> y <strong>Gaston Julia</strong> ya habían trabajado con estructuras similares antes.
                </p>
                <p>
                  Mandelbrot propuso que muchas estructuras de la naturaleza podían modelarse usando fractales,  
                  lo que revolucionó la geometría y abrió nuevas áreas en la ciencia y la tecnología.
                </p>
              </div>
            </div>
          </div>
  
          {/* 🔹 Sección Aplicaciones */}
          <div className="col-md-8">
            <div className="card bg-dark text-light mb-4">
              <div className="card-body">
                <h3 className="card-title text-warning">Aplicaciones de los Fractales</h3>
                <p className="card-text">
                  Los fractales tienen aplicaciones en diversas áreas como:
                </p>
                <ul className="list-unstyled">
                  <li>🧬 <strong>Biología:</strong> Modelado del crecimiento de células y patrones en la naturaleza.</li>
                  <li>🌍 <strong>Geografía:</strong> Formación de costas, ríos y montañas.</li>
                  <li>🎨 <strong>Arte y Diseño:</strong> Creación de imágenes fractales y animaciones generativas.</li>
                  <li>📡 <strong>Telecomunicaciones:</strong> Antenas fractales para optimizar señales.</li>
                  <li>🖥️ <strong>Gráficos por Computadora:</strong> Generación de texturas realistas en videojuegos y películas.</li>
                </ul>
              </div>
            </div>
          </div>
  
          {/* 🔹 Sección sobre Mandelbrot */}
          <div className="col-md-6">
            <div className="card bg-secondary text-light mb-4">
              <div className="card-body">
                <h3 className="card-title text-warning">Conjunto de Mandelbrot</h3>
                <p className="card-text">
                  Se define mediante la fórmula:<br />
                  <strong className="text-info">Z(n+1) = Z(n)² + C</strong>
                </p>
                <p>
                  Donde <strong>Z</strong> y <strong>C</strong> son números complejos.  
                  Si <strong>|Z| → ∞</strong> tras muchas iteraciones, el punto no pertenece al conjunto.
                </p>
              </div>
            </div>
          </div>
  
          {/* 🔹 Sección sobre Julia */}
          <div className="col-md-6">
            <div className="card bg-secondary text-light mb-4">
              <div className="card-body">
                <h3 className="card-title text-warning">Conjunto de Julia</h3>
                <p className="card-text">
                  Se define de manera similar a Mandelbrot, pero con un <strong>valor fijo de C</strong>:<br />
                  <strong className="text-info">Z(n+1) = Z(n)² + C</strong>
                </p>
                <p>
                  Dependiendo del valor de <strong>C</strong>, se generan patrones distintos.  
                  Se usa en modelado de **galaxias, partículas y simulaciones físicas**.
                </p>
              </div>
            </div>
          </div>
  
          {/* 🔹 Sección sobre Árbol Fractal */}
          <div className="col-md-6">
            <div className="card bg-secondary text-light mb-4">
              <div className="card-body">
                <h3 className="card-title text-warning">Árbol Fractal</h3>
                <p className="card-text">
                  Generado dividiendo una rama en dos partes más pequeñas en cada iteración.  
                  Su fórmula se basa en la recursión:
                </p>
                <p className="text-info">
                  L' = L * r
                </p>
                <p>
                  Se usa en **modelado de vegetación, estructuras de redes neuronales y simulaciones naturales**.
                </p>
              </div>
            </div>
          </div>
  
          {/* 🔹 Sección sobre Koch y Sierpinski */}
          <div className="col-md-6">
            <div className="card bg-secondary text-light mb-4">
              <div className="card-body">
                <h3 className="card-title text-warning">Curva de Koch & Triángulo de Sierpinski</h3>
                <p className="card-text">
                  - <strong>Curva de Koch:</strong> Se divide un segmento en 3 partes y se reemplaza la parte central con un triángulo sin base.<br />
                  - <strong>Triángulo de Sierpinski:</strong> Se subdivide un triángulo en 4 más pequeños y se elimina el central en cada iteración.
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* 🔹 Mensaje Final */}
        <p className="mt-4">
          🔍 Selecciona un fractal del menú para visualizar su estructura en tiempo real y entender su comportamiento matemático.
        </p>
      </div>
    );
  }
  
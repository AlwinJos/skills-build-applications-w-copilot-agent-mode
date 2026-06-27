import './App.css'

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title mb-3">OctoFit Tracker</h1>
              <p className="card-text text-muted">
                A modern multi-tier fitness tracking application is now scaffolded.
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">React 19 + Vite frontend</li>
                <li className="list-group-item">Express + TypeScript backend</li>
                <li className="list-group-item">MongoDB-ready Mongoose setup</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

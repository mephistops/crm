import { Link } from "react-router-dom"

export const Dock = (props) => {
  return (
    <div className="row">
      <div className="fixed-bottom">
        <div className="text-white">
          <div className="rounded-top row px-4 bg-primary">
            <div className="col-4 text-center">
              <Link className="row text-decoration-none text-white" to="/contacts">
                <div className="col-4 offset-4 border-top border-5 border-success">
                  <i className="bi bi-person-fill fs-3"></i>
                </div>
                <div className="col-12">
                  <span className="small fw-semibold">Contactos</span>
                </div>
              </Link>
            </div>
            <div className="col-4 text-center">
              <span className="row text-decoration-none text-white">
                <div className="col-4 offset-4 border-top border-5 border-transparent">
                  <i className="bi bi-file-earmark-check-fill fs-3"></i>
                </div>
                <div className="col-12">
                  <span className="small fw-semibold">Tareas</span>
                </div>
              </span>
            </div>
            <div className="col-4 text-center">
              <span className="row text-decoration-none text-white">
                <div className="col-4 offset-4 border-top border-5 border-transparent">
                  <i className="bi bi-chat-right-text-fill fs-3"></i>
                </div>
                <div className="col-12">
                  <span className="small fw-semibold">Comentarios</span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
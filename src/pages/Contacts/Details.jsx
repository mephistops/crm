import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dock } from "../../components/Dock";
import { DelTask, GetComments, GetOneContact, GetOneGender, GetTasks, GetUser, SetCommentDB } from "../../services/methods";
import moment from "moment";

export const Details = () => {
  let params = useParams();
  const [contact, setContact] = useState({});
  const [gender, setGender] = useState("")
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [tasks, setTasks] = useState([])

  const handleComment = (e) => {
    if (e.target.value !== '') {
      setComment(e.target.value)
    }
  }

  const onDelete = (e) => {
    DelTask(e).then(res=>{
      alert("Tarea Eliminada")
      window.location.href = "/contacts/details/"+params.id
    })
  }

  useEffect(() => {
    GetOneContact(params.id).then((res) => {
      setContact(res.data);
    })

    GetComments(params.id).then(res => {
      setComments(res.data)
    })

    GetTasks(params.id).then(res => {
      setTasks(res.data)
    })
  }, [])

  useEffect(() => {
    if (contact.gender !== null && contact.gender !== undefined) {
      GetOneGender(contact.gender).then(res => {
        setGender(res.data.description)
      })
    }
  }, [contact])

  const saveComment = () => {
    if (comment !== '') {
      let cmm = {
        id_contact: params.id,
        comment: comment
      }

      SetCommentDB(cmm).then(res => {
        alert("Comentario agregado");
        window.location.href = "/contacts/details/" + params.id;
      })
    } else {
      alert("Comentario vacío")
    }
  }
  return (
    <>
      <div className="p-2 mt-4 overflow-auto" style={{ height: "80vh" }}>
        <div className="row">
          <div className="col-2">
            <Link to="/contacts">
              <i className="bi bi-arrow-left fw-bold fs-2 text-primary"></i>
            </Link>

          </div>
          <div className="col-10">
            <h1 className="fw-bold fs-5 text-primary">Datos de contacto</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card rounded border-0" style={{ backgroundColor: "#F6F6F6" }}>
              <div className="card-body">
                <div className="row p-2">
                  <div className="col-md-6">
                    <span className="fw-bold fs-5 text-primary">{contact.firstname} {contact.lastname}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="small fs-5">{contact.phone}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="small fs-5">{contact.mail}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="small fs-5">{gender}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="small fs-5">{contact.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-4 position-relative">
              <span className="position-absolute translate-middle badge bg-success rounded" style={{ left: "90%" }}>{comments.length}</span>
              <div className="rounded p-4" style={{ backgroundColor: "#F6F6F6" }}>

                <p className="fs-5 fw-bold text-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                  Comentarios <i className="bi bi-caret-down-fill text-success"></i>
                </p>
                <div className="collapse" id="collapseExample">
                  <textarea rows={6} className="form-control rounded" value={comment} onChange={handleComment}></textarea>

                  <div className="row">
                    <div className="col-2 offset-9 mt-3">
                      <span className="btn btn-sm btn-primary rounded" onClick={saveComment}>Agregar</span>
                    </div>
                  </div>

                  <ul className="timeline">
                    {comments.map(element => {
                      return (
                        <li key={element.id} className="timeline-item bg-white rounded ml-4 p-4 shadow">
                          <div className="timeline-arrow"></div>
                          <h2 className="h6 mb-0">
                            {`Comentario `}
                            <span className="small text-gray">
                              <i className="bi bi-clock"></i>  {moment(element.date).format('L h:mm a')}
                            </span>
                          </h2>

                          <p className="text-small mt-2 fw-light">
                            {element.comment}
                          </p>

                          <div className="row text-center">
                            <div className="offset-6 col-2">
                              <i className="bi bi-pencil-fill text-primary"></i>
                            </div>
                            <div className="col-2">
                              <i className="bi bi-trash-fill text-primary"></i>
                            </div>
                            <div className="col-2">
                              <i className="bi bi-pin-fill text-secondary"></i>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

            </div>


            <div className="col-md-12 mt-4 position-relative">
              <span className="position-absolute translate-middle badge bg-success rounded" style={{ left: "90%" }}>{tasks.length}</span>
              <div className="rounded p-4" style={{ backgroundColor: "#F6F6F6" }}>

                <p className="fs-5 fw-bold text-primary" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
                  Tareas <i className="bi bi-caret-down-fill text-success"></i>
                </p>
                <div className="collapse" id="collapseExample2">
                  <div className="row">
                    <div className="col-6 offset-8">
                      <Link to={`/tasks/add/${params.id}`} className="btn btn-sm btn-primary rounded">Nueva tarea</Link>
                    </div>
                  </div>

                  <ul className="timeline">
                    {tasks.map(element => {
                      return (
                        <li key={element.id} className="timeline-item bg-white rounded ml-4 p-4 shadow">
                          <div className="timeline-arrow"></div>
                          <h2 className="h6 mb-0">
                            <span className="text-success bi bi-circle"></span>{` Tarea `}
                            <span className="small text-gray">
                              {moment(element.created_at).format('L h:mm a')}
                            </span>
                          </h2>

                          <p className="row small mt-2 fw-light">
                            <span><span className="fw-bold">CRM: </span>{element.title}</span>
                            <span><span className="fw-bold">Responsable: </span>{element.firstname} {element.lastname}</span>
                          </p>

                          <div className="row text-center">
                            <div className="offset-8 col-2">
                              <i className="bi bi-pencil-fill text-primary"></i>
                            </div>
                            <div className="col-2">
                              <div onClick={() => {onDelete(element.id)}}>
                                <i className="bi bi-trash-fill text-primary"></i>
                              </div>
                            </div>
                          </div>

                          <span className="small"><span className="fw-bold">Vence:</span> {moment(element.date_end).format('L h:mm a')}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Dock />
        </div>

      </div>
    </>
  )
}
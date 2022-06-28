import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dock } from "../../components/Dock";
import { Header } from "../../components/Header";
import { GetOneContact, GetTask, GetTasks, GetUsers, PutTasks, SetTask } from "../../services/methods";

export const EditTask = () => {
  let params = useParams();

  const [contact, setContact] = useState({
    firstname: "",
    lastname: "",
    mail: "",
    gender: "",
    birthday: "",
    address: "",
    phone: "",
    origin: "",
    contact_type: "",
  });
  
  const [users, setUsers] = useState([])
  const [task, setTask] = useState({})

  useEffect(() => {
    GetOneContact(params.id).then((res) => {
      setContact(res.data);
    })

    GetUsers().then((res) => {
      setUsers(res.data)
    })

    GetTask(params.id).then((res) => {
      setTask({
        id: res.data.id,
        title: res.data.title,
        dateEnd: res.data.date_end,
        owner: res.data.firstname + " " + res.data.lastname,
        id_user: res.data.id_1
      })
    })
  }, [])

  const handleSubmit = (e) => {
    if (task.id_user === "" || task.dateEnd === "" || task.title === "") {
      alert("Todos los campos son requeridos")

    } else {
      let taskNew = {
        id: params.id_task,
        title: task.title,
        date_end: task.dateEnd,
        id_user: task.id_user,
        status: 1,
        id_contact: params.id
      }
      PutTasks(taskNew).then(res => {
        alert("Tarea editada")
        window.location.href = "/contacts/details/" + params.id
      })
    }
  }

  return (
    <>
      <div className="p-2 mt-4">
        <div className="row">
          <div className="col-2">
            <Link to="/contacts">
              <i className="bi bi-arrow-left fw-bold fs-2 text-primary"></i>
            </Link>

          </div>
          <div className="col-10">
            <h1 className="fw-bold fs-5 text-primary">{contact.firstname} {contact.lastname}</h1>
          </div>
        </div>
        <Header title="Editar tarea" />
        <form>
          <div className="row p-3">
            <div style={{ backgroundColor: "#F6F6F6", height: "360px" }} className="rounded p-4 overflow-auto">
              <div className="col-12 mb-3">
                <label htmlFor="" className="fw-semibold text-primary">Titulo de la tarea</label>
                <input type="text" value={task.title} onChange={(e) => setTask({...task, title: e.target.value})} className="form-control rounded p-3" placeholder="Agregar título" />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="" className="fw-semibold text-primary">Persona responsable</label>
                <select onChange={(e) => { setTask({...task, id_user: e.target.value}) }} className="form-select border-0 rounded p-3">
                  <option value="">Selecciona</option>
                  {users.map((ele) => {
                    return (
                      (ele.id === task.id_user) ?
                        <option selected value={ele.id}>{ele.firstname} {ele.lastname}</option> :
                        <option value={ele.id}>{ele.firstname} {ele.lastname}</option>
                    )
                  })}
                </select>
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="" className="fw-semibold text-primary">Fecha límite</label>
                <input type="datetime-local" value={task.dateEnd} onChange={(e) => { setTask({...task, dateEnd: e.target.value}) }} className="form-control rounded p-3" />
              </div>

              <div className="mt-4 col-12 mb-5">
                <Link className="btn fw-bold col-5 p-1 rounded text-white btn-secondary" to="/contacts">
                  Cancelar
                </Link>
                <span onClick={handleSubmit} className="btn fw-bold col-5 offset-2 p-1 rounded text-white btn-success">
                  Editar
                </span>
              </div>
            </div>
          </div>

        </form>

        <Dock />
      </div>
    </>
  )
}
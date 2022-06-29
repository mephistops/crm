import moment from "moment";
import { Link } from "react-router-dom";
import { DelContact } from "../services/methods";

export const Contact = (props) => {
  const { contact } = props;

  const handleDelete = (id) => {
    DelContact(id).then(res => {
      alert("Contacto eliminado");
      window.location.href = "/contacts";
    });
  }

  const add = (e) => {
    switch (e) {
      case 'call':
        window.location.href = "/tasks/add/" + contact.id + "/call"
        break

      case 'msg':
        window.location.href = "/tasks/add/" + contact.id + "/msg"
        break

      case 'msgWhatsApp':
        window.location.href = "/tasks/add/" + contact.id + "/msgWhatsApp"
        break

      case 'callWhatsAPP':
        window.location.href = "/tasks/add/" + contact.id + "/callWhatsAPP"
        break
    }
  }

  return (
    <div className="text-decoration-none">
      <div className="row px-2">
        <div className="col-6">
          <Link to={`/contacts/details/${contact.id}`} className="text-decoration-none">
            <h3 className="fs-6 text-dark fw-semibold">{contact.firstname} {contact.lastname}</h3>
            <h3 className="fs-6 text-primary">{contact.phone}</h3>
          </Link>
        </div>
        <div className="col-2 p-2">
          <Link to={`/contacts/edit/${contact.id}`}>
            <i className="bi bi-pencil-fill fs-4 text-primary"></i>
          </Link>
        </div>
        <div className="col-2 p-2">
          <div className="dropdown">
            <span className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-check-circle-fill fs-4 text-primary"></i>
            </span>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className="row" onClick={() => { add('call') }}>
                <div className="col-6">
                  <span className="dropdown-item small">Llamada telefónica</span>
                </div>
                <div className="col-5 text-end">
                  <i className="bi bi-telephone-fill text-primary"></i>
                </div>
              </li>
              <li className="row" onClick={() => { add('msg') }}>
                <div className="col-6">
                  <a className="dropdown-item small" href="#">Mensaje de texto</a>
                </div>
                <div className="col-5 text-end">
                  <i className="bi bi-chat-left-text-fill text-primary"></i>
                </div>
              </li>
              <li className="row" onClick={() => { add('callWhatsAPP') }}>
                <div className="col-6">
                  <a className="dropdown-item small" href="#">Llamada por Whatsapp</a>
                </div>
                <div className="col-5 text-end">
                  <i className="bi bi-whatsapp text-success"></i>
                </div>
              </li>
              <li className="row" onClick={() => { add('msgWhatsAPP') }}>
                <div className="col-6">
                  <a className="dropdown-item small" href="#">Mensaje de Whatsapp</a>
                </div>
                <div className="col-5 text-end">
                  <i className="bi bi-whatsapp text-success"></i>
                </div>
              </li>
            </ul>
          </div>

        </div>
        <div className="col-2 p-2">
          <div onClick={() => { handleDelete(contact.id) }}>
            <i className="bi bi-trash-fill fs-4 text-primary"></i>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}
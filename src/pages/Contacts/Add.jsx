import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Contact } from "../../components/Contact";
import { Dock } from "../../components/Dock";
import { Header } from "../../components/Header";
import { GetContactType, GetGender, GetOrigins, SetContact } from "../../services/methods";

export const Add = () => {
  const [origins, setOrigins] = useState([]);
  const [contactType, setContactType] = useState([]);
  const [gender, setGender] = useState([])

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

  useEffect(() => {
    GetOrigins().then((res) => {
      setOrigins(res.data);
    })

    GetContactType().then((res) => {
      setContactType(res.data);
    })

    GetGender().then((res) => {
      setGender(res.data);
    })
  }, [])

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.firstname === "" || contact.lastname === "" || contact.email === "" || contact.birthday === "" || contact.address === "" || contact.phone === "" || contact.origin === "" || contact.contact_type === "") {
      alert("Todos los campos son obligatorios");
    } else {
      SetContact(contact).then((res) => {
        alert("Contacto agregado");
        window.location.href = "/contacts";
      });
    }
    console.log(contact);
  }

  return (
    <>
      <div className="p-2 mt-4">
        <Header title="Nuevo contacto" />
        <form>
          <div className="row p-3">
            <div style={{ backgroundColor: "#F6F6F6", height: "360px" }} className="rounded p-4 overflow-auto">

              <div className="col-12 mb-3">
                <input type="text" name="firstname" required onChange={(e) => handleChange(e)} className="form-control p-3 rounded" placeholder="Nombres" />
              </div>
              <div className="col-12 mb-3">
                <input type="text" name="lastname" required onChange={(e) => handleChange(e)} className="form-control p-3 rounded" placeholder="Apellidos" />
              </div>
              <div className="col-12 mb-3">
                <input type="text" name="mail" required onChange={(e) => handleChange(e)} className="form-control p-3 rounded" placeholder="E-mail" />
              </div>

              <div className="col-12 mb-3">
                <select name="gender" required onChange={(e) => handleChange(e)} className="form-select border-0 rounded p-3">
                  <option value="">Género</option>
                  {gender.map((e) => (
                    <option value={e.id}>{e.description}</option>
                  ))}
                </select>
              </div>
              <div className="col-12 mb-3">
                <input type="tel" name="phone" required onChange={(e) => handleChange(e)} className="form-control p-3 rounded" placeholder="Cel/Tel" />
              </div>
              <div className="col-12 mb-3">
                <input type="date" name="birthday" required onChange={(e) => handleChange(e)} className="form-control p-3 rounded" placeholder="Fecha de nacimiento" />
              </div>
              <div className="col-12 mb-3">
                <input type="text" name="address" required onChange={(e) => handleChange(e)} className="form-control p-3 rounded" placeholder="Dirección" />
              </div>

              <div className="col-12 mb-3">
                <select name="contact_type" required onChange={(e) => handleChange(e)} className="form-select border-0 rounded p-3">
                  <option value="">Tipo de contacto</option>
                  {contactType.map((contactType) => (
                    <option value={contactType.id}>{contactType.description}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 mb-3">
                <select name="origin" required onChange={(e) => handleChange(e)} className="form-select border-0 rounded p-3">
                  <option value="">Origen</option>
                  {origins.map((origin) => (
                    <option value={origin.id}>{origin.description}</option>
                  ))}
                </select>
              </div>
              
              <div className="mt-4 col-12">
                <Link className="btn fw-bold col-5 p-1 rounded text-white btn-secondary" to="/contacts">
                  Cancelar
                </Link>
                <button type="submit" onClick={handleSubmit} className="btn fw-bold col-5 offset-2 p-1 rounded text-white btn-success">
                  Agregar
                </button>
              </div>
            </div>
          </div>

        </form>

        <Dock />
      </div>
    </>
  )
}
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dock } from "../../components/Dock";
import { Header } from "../../components/Header";
import { GetContactType, GetGender, GetOneContact, GetOrigins, PutContact } from "../../services/methods";

export const Edit = () => {
  const [origins, setOrigins] = useState([]);
  const [contactType, setContactType] = useState([]);
  const [genders, setGenders] = useState([])

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [origin, setOrigin] = useState("");
  const [contact_type, setContact_type] = useState("");
  const [gender, setGender] = useState("")

  let params = useParams();

  useEffect(() => {
    GetOrigins().then((res) => {
      setOrigins(res.data);
    })

    GetContactType().then((res) => {
      setContactType(res.data);
    })

    GetGender().then((res) => {
      setGenders(res.data);
    })

    GetOneContact(params.id).then((res) => {
      setFirstname(res.data.firstname);
      setLastname(res.data.lastname);
      setMail(res.data.mail);
      setBirthday(res.data.birthday);
      setAddress(res.data.address);
      setPhone(res.data.phone);
      setOrigin(res.data.origin);
      setContact_type(res.data.contact_type);
      setGender(res.data.gender)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstname === "" || lastname === "" || mail === "" || birthday === "" || address === "" || phone === "" || origin === "" || contact_type === "" || gender === "") {
      alert("Todos los campos son obligatorios");
    } else {
      let contact = {
        id: params.id,
        firstname: firstname,
        lastname: lastname,
        mail: mail,
        birthday: birthday,
        address: address,
        phone: phone,
        origin: origin,
        contact_type: contact_type,
        gender: gender
      }

      PutContact(contact).then((res) => {
        alert("Contacto actualizado");
        window.location.href = "/contacts";
      });
    }
  }

  return (
    <>
      <div className="p-2 mt-4">
        <Header title="Editar contacto" />

        <div className="row p-3">
          <div style={{ backgroundColor: "#F6F6F6", height: "360px" }} className="rounded p-4 overflow-auto">
            <form action="">
              <div className="col-12 mb-3">
                <div className="input-group">
                  <input type="text" value={firstname} onChange={(e) => { setFirstname(e.target.value) }} className="form-control border-0 p-3 rounded-left" placeholder="Nombres" />
                  <span className="input-group-text rounded-right border-0 text-primary" style={{ backgroundColor: "#fff" }} id="addon-wrapping">
                    <i className="bi bi-pencil-fill"></i>
                  </span>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="input-group">
                  <input type="text" value={lastname} onChange={(e) => { setLastname(e.target.value) }} className="form-control border-0 p-3 rounded-left" placeholder="Apellidos" />
                  <span className="input-group-text rounded-right border-0 text-primary" style={{ backgroundColor: "#fff" }} id="addon-wrapping">
                    <i className="bi bi-pencil-fill"></i>
                  </span>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="input-group">
                  <input type="text" value={mail} onChange={(e) => { setMail(e.target.value) }} className="form-control border-0 p-3 rounded-left" placeholder="E-mail" />
                  <span className="input-group-text rounded-right border-0 text-primary" style={{ backgroundColor: "#fff" }} id="addon-wrapping">
                    <i className="bi bi-pencil-fill"></i>
                  </span>
                </div>
              </div>

              <div className="col-12 mb-3">
                <select value={gender} required onChange={(e) => handleChange(e)} className="form-select border-0 rounded p-3">
                  <option value="">Género</option>
                  {genders.map((e) => (
                    <option value={e.id}>{e.description}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 mb-3">
                <div className="input-group">
                  <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control border-0 p-3 rounded-left" placeholder="Tel/Cel" />
                  <span className="input-group-text rounded-right border-0 text-primary" style={{ backgroundColor: "#fff" }} id="addon-wrapping">
                    <i className="bi bi-pencil-fill"></i>
                  </span>
                </div>
              </div>

              <div className="col-12 mb-3">
                <input type="date" value={birthday} onChange={(e) => { setBirthday(e.target.value) }} className="form-control border-0 p-3 rounded" placeholder="Fecha de nacimiento" />
              </div>

              <div className="col-12 mb-3">
                <div className="input-group">
                  <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} className="form-control border-0 p-3 rounded-left" placeholder="Dirección" />
                  <span className="input-group-text rounded-right border-0 text-primary" style={{ backgroundColor: "#fff" }} id="addon-wrapping">
                    <i className="bi bi-pencil-fill"></i>
                  </span>
                </div>
              </div>

              <div className="col-12 mb-3">
                <select value={contact_type} onChange={(e) => { setContact_type(e.target.value) }} className="form-select border-0 rounded p-3">
                  <option value="">Tipo de contacto</option>
                  {contactType.map((contactType) => (
                    <option value={contactType.id}>{contactType.description}</option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <select value={origin} onChange={(e) => { setOrigin(e.target.value) }} className="form-select border-0 rounded p-3">
                  <option value="">Origen</option>
                  {origins.map((origin) => (
                    <option value={origin.id}>{origin.description}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 mt-4">
                <Link className="btn fw-bold col-5 p-1 rounded text-white btn-secondary" to="/contacts">
                  Cancelar
                </Link>
                <button type="submit" onClick={handleSubmit} className="btn fw-bold col-5 offset-2 p-1 rounded text-white btn-success">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>

        <Dock />
      </div>
    </>
  )
}
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Contact } from "../../components/Contact";
import { Dock } from "../../components/Dock";
import { Header } from "../../components/Header";
import { GetAllContacts } from "../../services/methods";

export const Contacts = () => {
  const [contacts, setContacts] = React.useState([]);

  useEffect(() => {
    GetAllContacts().then(res => {
      setContacts(res.data);
    }
    );
  }, [])

  return (
    <>
      <div className="p-2 mt-4">
        <Header title="Lista de contactos" search={true} />

        <div className="row p-3">
          <div style={{ backgroundColor: "#F6F6F6", height: "360px" }} className="rounded p-4 overflow-auto">
            {contacts.map(contact => (
              <Contact key={contact.id} contact={contact} />
            ))}
          <Link to="/contacts/add" className="btn col-4 fw-bold offset-4 p-1 rounded text-white bg-primary">
            Agregar <i className="bi bi-person-plus-fill"></i>
          </Link>
          </div>

        </div>

      </div>

      <Dock />
    </>
  )
}
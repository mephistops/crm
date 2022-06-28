import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dock } from "../../components/Dock";
import { Header } from "../../components/Header";
import { DelComment, GetComment, PutComment } from "../../services/methods";

export const EditComment = () => {
  let params = useParams();
  
  const [comment, setComment] = useState("");

  useEffect(() => {
    GetComment(params.id).then((res) => {
      setComment(res.data.comment);
    })
  }, [])

  const handleComment = () => {
    PutComment({
      id: params.id,
      comment: comment
    }).then((res) => {
      alert("Comentario actualizado");
      window.location.href = "/contacts/details/" + params.id_contact;
    })
  }

  return (
    <>
      <div className="p-2 mt-4">
        <Header title="Editar comentario" />
        <form>
          <div className="row p-3">
            <div style={{ backgroundColor: "#F6F6F6", height: "360px" }} className="rounded p-4 overflow-auto">
              <div className="col-12 mb-3">
                <label htmlFor="" className="fw-semibold text-primary">Comentario</label>
                <textarea type="text" value={comment} onChange={(e) => setComment(e.target.value)} className="form-control rounded p-3"></textarea>
              </div>

              <div className="mt-4 col-12 mb-5">
                <Link className="btn fw-bold col-5 p-1 rounded text-white btn-secondary" to="/contacts">
                  Cancelar
                </Link>
                <span onClick={handleComment} className="btn fw-bold col-5 offset-2 p-1 rounded text-white btn-success">
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
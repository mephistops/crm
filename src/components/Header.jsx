export const Header = (props) => {
  return (

    <div className="row">
      {props.search &&
        <div className="input-group">
          <input type="text" style={{ backgroundColor: "#F6F6F6" }} className="form-control border-0 p-3 rounded-left" placeholder="Buscar" />
          <span class="input-group-text rounded-right border-0 text-primary" style={{ backgroundColor: "#F6F6F6" }} id="addon-wrapping">
            <i className="bi bi-search"></i>
          </span>
        </div>
      }

      <h2 className="px-4 fs-4 mt-4 mb-6 fw-bold text-primary">{props.title}</h2>
    </div>
  )
}
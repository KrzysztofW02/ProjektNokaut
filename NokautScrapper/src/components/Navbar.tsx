import Dropdown from "react-bootstrap/Dropdown";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#home">
          Home
        </a>
        <div className="d-flex mx-auto">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Czego szukasz?"
          />
          <button className="btn btn-outline-light" type="submit">
            Szukaj
          </button>
        </div>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
      </div>
    </nav>
  );
}

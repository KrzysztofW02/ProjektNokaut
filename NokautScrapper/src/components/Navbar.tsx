import Dropdown from "react-bootstrap/Dropdown";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand col-1 row-2" href="#home">
          Wyszukiwarka
        </a>
        
          <div className="d-flex mx-auto row-2 col-4 ">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Czego szukasz?"
            />
            <button className="btn btn-outline-light col-2" type="submit">
              Szukaj
            </button>
        </div>
        //** przycisk sortowania */
        <Dropdown>
          <Dropdown.Toggle
            className="btn btn-outline-light row-2"
            variant="secondary"
            id="dropdown-basic"
          >
            Sortowanie
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Cena od najwyższej</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Cena od najniższej</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}

export default Navbar;
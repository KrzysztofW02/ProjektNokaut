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
      </div>
    </nav>
  );
}

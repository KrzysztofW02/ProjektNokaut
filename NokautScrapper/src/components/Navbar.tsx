import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./Grid"
import "../Sorting";
import { sortDataByAscending, sortDataByDescending } from "../Sorting";
import { useProducts } from "../hooks/useProducts";

interface NavbarProps {
  onSearch: (searchText: string) => void;
}

function Navbar({ onSearch }: NavbarProps) {
  const [searchText, setSearchText] = useState("");
  const { data } = useProducts();

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchText);
    }
  };

const handleSort = (desc: boolean) => {
  let result = [];
  if (!desc) {
    sortDataByAscending(data);
  } else {
    sortDataByDescending(data);
  }
}

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand col-1 row-2" href="#home">
          Wyszukiwarka
        </a>
        <div className="d-flex mx-auto row-2" style={{ minWidth: "35%" }}>
          <input
            className="form-control me-2 w-100"
            type="text"
            placeholder="Czego szukasz?"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="btn btn-outline-light "
            type="button"
            onClick={handleSearch}
          >
            Szukaj
          </button>
        </div>
        {/* przycisk sortowania */}
        <Dropdown>
          <Dropdown.Toggle
            className="btn btn-outline-light row-2"
            variant="secondary"
            id="dropdown-basic"
          >
            Sortowanie
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleSort}>Cena od najwyższej</Dropdown.Item>
            <Dropdown.Item onClick={handleSort}>Cena od najniższej</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}

export default Navbar;

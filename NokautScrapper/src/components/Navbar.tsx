import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./Grid"
import "../Sorting";
import { sortDataByAscending, sortDataByDescending } from "../Sorting";

interface NavbarProps {
  onSearch: (searchText: string) => void;
}

function Navbar({ onSearch }: NavbarProps) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchText);
    }
  };

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
            <Dropdown.Item /*onClick={sortDataByDescending}*/>Cena od najwyższej</Dropdown.Item>
            <Dropdown.Item /*onClick={sortDataByAscending}*/>Cena od najniższej</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}

//TODO: w pliku Sorting.tsx są funkcje sortowania, które z założenia działają, ale nie na przyciskach :D 

export default Navbar;

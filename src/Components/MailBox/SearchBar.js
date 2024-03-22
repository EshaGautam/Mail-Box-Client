import React from 'react'
import { Navbar,Form,InputGroup} from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css'

const SearchBar = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" className="search-nav">
        <Navbar.Brand className="name">MAILBOX</Navbar.Brand>
        <InputGroup className="input" size="sm" style={{ minWidth: "50vw" }}>
          <Form.Control
            className="search-bar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <InputGroup.Text>
            <button className='search-btn'>
              <FaSearch />
            </button>
          </InputGroup.Text>
        </InputGroup>
      </Navbar>
    </div>
  );
}

export default SearchBar
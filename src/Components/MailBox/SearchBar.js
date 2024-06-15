import React, { useState } from 'react'
import { Navbar,Form,InputGroup} from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { mailAction } from '../../Store/MailDataSlice';

const SearchBar = () => {

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" className="search-nav">
        <Navbar.Brand className="name">MAILBOX</Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default SearchBar
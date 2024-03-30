import React from "react";
import MailMenu from "./MailMenu";
import SearchBar from "./SearchBar";
import ComposeMail from "./ComposeMail";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const MailBox = () => {
  const visibleMail  = useSelector(state=>state.mail.visibleMail)
  return (
    <div>
      <SearchBar />
      <MailMenu />
      {visibleMail && <ComposeMail />}
    </div>
  );
};

export default MailBox;

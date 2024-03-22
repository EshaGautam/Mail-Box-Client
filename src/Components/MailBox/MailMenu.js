
import {
  Nav
} from "react-bootstrap";
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './MailMenu.css'
import MailContent from './MailContent';
import authContext from "../Store/Context";
import { useContext } from "react";
const MailMenu = () => {
 const { endpoint } = useParams();
 const authCtx = useContext(authContext);
 const { handleComposeMailState } = authCtx;
 
 const handleComposeMail=()=>{
handleComposeMailState()
 }

  return (
    <>
      <div className="mail-navbar">
        <button className="compose-btn" onClick={handleComposeMail}>
          Compose
        </button>
        <Nav className="mail-nav">
          <Link to={`/mail/inbox`} className="mail-link">
            INBOX
          </Link>
          <Link to={`/mail/sent`} className="mail-link">
            SENT
          </Link>
          <Link href="#action1" className="mail-link">
            Home
          </Link>
          <Link href="#action1" className="mail-link">
            Home
          </Link>
        </Nav>
      </div>
     
      {endpoint === "inbox" && <MailContent />}
      {endpoint === "sent" && <MailContent />}
    </>
  );
}

export default MailMenu
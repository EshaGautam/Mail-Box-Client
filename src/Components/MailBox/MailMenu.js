
import {
  Nav
} from "react-bootstrap";
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './MailMenu.css'
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../Store/MailDataSlice";
import MailContent from "./MailContent";

const MailMenu = () => {
const userEmail = useSelector(state=>state.auth.userEmail)
const {endpoint} = useParams()
 const dispatch = useDispatch()
 
 const handleComposeMail=()=>{
dispatch(mailAction.setVisibleMail())
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
    </>
  );
}

export default MailMenu
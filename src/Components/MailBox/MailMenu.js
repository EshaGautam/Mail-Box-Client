import { Nav } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./MailMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../Store/MailDataSlice";
import MailContent from "./MailContent";
import { authAction } from "../Store/AuthSlice";

const MailMenu = () => {
  const history = useHistory()
  const userEmail = useSelector((state) => state.auth.userEmail);
  const unreadCount = useSelector((state) => state.mail.unreadCount);
  const { endpoint } = useParams();
  const dispatch = useDispatch();

  const handleComposeMail = () => {
    dispatch(mailAction.setVisibleMail());
  };

  const logoutHandler=()=>{
    dispatch(authAction.logout())
    history.replace('/signup')
  }

  

  return (
    <>
      <div className="mail-navbar">
        <button className="compose-btn" onClick={handleComposeMail}>
          Compose
        </button>
        <Nav className="mail-nav">
        <Link to="/home" className="mail-link">
              HOME
            </Link>
          <Link to={`/mail/inbox`}  className="mail-link">
            INBOX {unreadCount > 0 && <span style={{backgroundColor:'grey',height:'2%',width:'4%',padding:'0.25rem',marginLeft:'5px',borderRadius:'7px'}}>{unreadCount}</span>}
          </Link>
          <Link to={`/mail/sent`} className="mail-link">
            SENT
          </Link>
           <Link to="/signup" className="mail-link" onClick={logoutHandler}>
              LOGOUT
            </Link>
        </Nav>
      </div>
      
    </>
  );
};

export default MailMenu;

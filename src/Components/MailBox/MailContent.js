import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './MailContent.css'
import { useParams } from "react-router-dom";
import { Card,ListGroup,} from "react-bootstrap";
import { deleteMail, fetchMail, mailAction } from "../Store/MailDataSlice";
import { useSelector,useDispatch } from "react-redux";
import { ReadMessage } from "../Store/MailDataSlice";
import { MdDelete } from "react-icons/md";



const MailContent = () => {
  const {  endpoint } = useParams(); 
  const fetchedData = useSelector(state=>state.mail.fetchedData)
  const userEmail = useSelector(state=>state.auth.userEmail)
  const readState = useSelector(state=>state.mail.readState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMail(userEmail,endpoint));
    console.log(endpoint)
  
  }, [userEmail,endpoint]);
  
  useEffect(() => {
    const storedReadState = JSON.parse(localStorage.getItem('mailData'));
    if (storedReadState && storedReadState.read) {
      dispatch(mailAction.setReadState());
    } else {
      localStorage.setItem('read',false)
    }
  }, [dispatch]);
  
  const convertHtmlToPlainText = (html) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  }

const handleCheckBox=(event)=>{
event.stopPropagation()
}

const handleDeleteMail=(event,userId)=>{
  event.preventDefault()
 const filteredMail = fetchedData.filter((mail)=>mail.id !== userId)
 dispatch(mailAction.setFetchedData(filteredMail))
 dispatch(deleteMail(userEmail,endpoint,userId))

}
const handleReadMessage = (userId) => {
  if (endpoint === 'sent') {
    return;
  }
  const updateMail = fetchedData.find(data => data.id === userId);
  if (updateMail && !readState) {
    dispatch(mailAction.setReadState())
    dispatch(ReadMessage(userEmail, endpoint, updateMail));
  }

};


  return (
    fetchedData.length>0&&(<Card className="ctn-1">
      {fetchedData.map((mail) => (
       <div key={mail.id}>
       <Link to={`/mail/${endpoint}/${mail.id}`} className='link-wrapper'onClick={()=>{handleReadMessage(mail.id)}}><ListGroup>
          <ListGroup.Item key={mail.id} className="mail-list">   
              <span>
               {!mail.read&&endpoint==='inbox'&&<div className="read-message"></div>}    
                <input type="checkbox" id="check" onClick={handleCheckBox} />
              </span>
              <span>{endpoint === 'inbox' ? `From: ${mail.sender}` : `To: ${mail.receiver}`}</span>
              <span>{mail.subject}</span>
              <span>{convertHtmlToPlainText(mail.content.length > 100 ? mail.content.substring(0, 100) + "..." : mail.content)}</span>
            <span>{mail.timestamp}</span>
            <div onClick={(event)=>handleDeleteMail(event,mail.id)} className="delete-icon"><MdDelete /></div>
          </ListGroup.Item>
        </ListGroup>
        </Link>
        </div>
      ))}
    </Card>)
  );
};

export default MailContent;

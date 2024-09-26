
import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./ComposeMail.css";
import { Form, InputGroup, Card } from "react-bootstrap";
import moment from "moment"; // Import moment.js for date formatting

import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../Store/MailDataSlice";
import useSendEmail from "../../Custom-hook/useSendMail";

const ComposeMail = () => {
  const modalRoot = document.getElementById("modal-root");
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const sendEmail = useSendEmail();
  const receiverEmail = useRef();
  const subject = useRef();
  const content = useRef();

  const sendMailData = () => {
    const timeStamp = moment().format("DD-MM-YYYY HH:mm:ss"); 
    const userData = {
      sender: userEmail,
      receiver: receiverEmail.current.value,
      subject: subject.current.value,
      content: content.current.value,
      timestamp: timeStamp,
    };
    console.log(userData);
    sendEmail(userData);
    dispatch(mailAction.setVisibleMail());
  };

  const handleCloseBtn = () => {
    dispatch(mailAction.setVisibleMail());
  };

  return ReactDOM.createPortal(
    <Card className="mail-ctn">
      <IoMdClose className="close-icon" onClick={handleCloseBtn} />
      <Card.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>To:</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={receiverEmail}
          />
        </InputGroup>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="subject" ref={subject} />
        </Form.Group>
        <div className="editor">
          <ReactQuill theme="snow" ref={content} style={{ height: "40vh" }} />
        </div>
        <button className="send-btn" type="submit" onClick={sendMailData}>
          Send
        </button>
      </Card.Body>
    </Card>,
    modalRoot
  );
};

export default ComposeMail;

import React, { useRef, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./ComposeMail.css";
import { Form, InputGroup, Card } from "react-bootstrap";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { SendEmail, mailAction, mailInInbox } from "../../Store/MailDataSlice";
import useSendEmail from "../../Custom-hook/useSendMail";

const ComposeMail = () => {
  const modalRoot = document.getElementById("modal-root");
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const receiverEmail = useRef();
  const subject = useRef();
  const content = useRef();
  const sendEmail = useSendEmail();

  const sendMailData = () => {
    const timeStamp = new Date();
    const userData = {
      sender: userEmail,
      receiver: receiverEmail.current.value,
      subject: subject.current.value,
      content: content.current.value,
      timestamp: timeStamp,
    };
    sendEmail(userData);
    dispatch(mailAction.setVisibleMail());
  };

  return ReactDOM.createPortal(
    <Card className="mail-ctn">
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
          <ReactQuill theme="snow" ref={content} />
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

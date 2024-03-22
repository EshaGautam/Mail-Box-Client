import React, { useRef, useState } from "react";
import "./ComposeMail.css";
import { Form, InputGroup, Card } from "react-bootstrap";
import { useContext } from "react";
import authContext from "../Store/Context";
import { Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactDOM from "react-dom";


const ComposeMail = (props) => {
  const modalRoot = document.getElementById("modal-root");
  const authCtx = useContext(authContext);
  const { userEmail } = authCtx;
  const [editorState, setEditorState] = useState(null);
  const receiverEmail = useRef();
  const subject = useRef();

  const sendMail = async () => {
    const mailTosend = receiverEmail.current.value.replace(/[.@]/g, "");
    const content = editorState.getCurrentContent().getPlainText();
    const timeStamp =new Date() 

    const userData = {
      email: receiverEmail.current.value,
      subject: subject.current.value,
      content: content,
      timestamp: timeStamp,
    };
    try {
      const data = await fetch(
        `https://mail-box-client-a0c72-default-rtdb.firebaseio.com/${userEmail}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (data.ok) {
        alert("Mail Sent SuccessFully");
      } else {
        throw new Error("problem in sending mail");
      }
    } catch (error) {
      alert(error);
    }
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
          <Editor
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </div>

        <button className="send-btn" type="submit" onClick={sendMail}>
          Send
        </button>
      </Card.Body>
    </Card>,
    modalRoot
  );
};

export default ComposeMail;

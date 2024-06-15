import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./MailContent.css";
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { deleteMail, fetchMail, mailAction } from "../../Store/MailDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { ReadMessage } from "../../Store/MailDataSlice";
import { MdDelete } from "react-icons/md";
// import useFetchMail from "../../Custom-hook/useFetchMail";

const MailContent = () => {
  const { endpoint } = useParams();
  const fetchedData = useSelector((state) => state.mail.fetchedData);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const readState = useSelector((state) => state.mail.readState);
  const unreadCount = useSelector((state) => state.mail.unreadCount);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchMail(userEmail, endpoint, fetchedData));
    };
    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, [dispatch, userEmail, endpoint]);

  useEffect(() => {
    const storedReadState = JSON.parse(localStorage.getItem("mailData"));
    if (storedReadState && storedReadState.read) {
      dispatch(mailAction.setReadState());
    } else {
      localStorage.setItem("read", false);
    }
  }, [dispatch]);

  const convertHtmlToPlainText = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  const handleCheckBox = (event) => {
    event.stopPropagation();
  };

  const handleDeleteMail = (event, userId) => {
    event.preventDefault();
    const filteredMail = fetchedData.filter((mail) => mail.id !== userId);
    dispatch(mailAction.setFetchedData(filteredMail));
    dispatch(deleteMail(userEmail, endpoint, userId));
  };

  const handleReadMessage = (userId) => {
    if (endpoint === "sent") {
      return;
    }

    const updateMail = fetchedData.find((data) => data.id === userId);
    if (updateMail && !updateMail.read) {
      dispatch(mailAction.setReadState());
      dispatch(ReadMessage(userEmail, endpoint, updateMail));
      dispatch(mailAction.decreaseUnreadCount());
    }
  };

  return (
    fetchedData.length > 0 && (
      <div className="ctn-1">
        {fetchedData.map((mail) => (
          <div key={mail.id}>
            <Link
              to={`/mail/${endpoint}/${mail.id}`}
              className="link-wrapper"
              onClick={() => {
                handleReadMessage(mail.id);
              }}
            >
              <ListGroup>
                <ListGroup.Item key={mail.id} className="mail-list">
                  <span>
                    {!mail.read && endpoint === "inbox" && (
                      <div className="read-message"></div>
                    )}
                    <input
                      type="checkbox"
                      id="check"
                      onClick={handleCheckBox}
                    />
                  </span>
                  <span>
                    {endpoint === "inbox"
                      ? `From: ${mail.sender.replace(/(gmail)(com)/, "@$1.$2")}`
                      : `To: ${mail.receiver}`}
                  </span>
                  <span>{mail.subject}</span>
                  <span>
                    {convertHtmlToPlainText(
                      mail.content.length > 100
                        ? mail.content.substring(0, 100) + "..."
                        : mail.content
                    )}
                  </span>
                  <span>{mail.timestamp}</span>
                  <div
                    onClick={(event) => handleDeleteMail(event, mail.id)}
                    className="delete-icon"
                  >
                    <MdDelete />
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Link>
          </div>
        ))}
      </div>
    )
  );
};

export default MailContent;


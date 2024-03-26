import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./MailDataToShow.css";
import { useSelector } from "react-redux";

const MailDataToShow = () => {
  const  fetchedData = useSelector(state=>state.mail.fetchedData)
  const [mailData, setMailData] = useState(null);
  const {endpoint,mailId } = useParams();
  

  useEffect(() => {
    if (fetchedData && fetchedData.length > 0 && mailId) {
      const mailToShow = fetchedData.find((mail) => mail.id === mailId);
      if (mailToShow) {
        setMailData(mailToShow);
        localStorage.setItem('mailData', JSON.stringify(mailToShow));
      }
    } else {
      const storedMailData = localStorage.getItem('mailData');
      if (storedMailData) {
        setMailData(JSON.parse(storedMailData));
      }
    }
  }, [fetchedData, mailId]);

  
  const convertHtmlToPlainText = (html) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  }

  return (
    <div className="mail-data-ctn">
      {mailData && (
        <div className="mail-data">
          <div className="mail-header-ctn">
          <div className="mail-header">
            <h2>{mailData.subject}</h2>
            <p>{endpoint === 'inbox' ? `From: ${mailData.sender}` : `To: ${mailData.receiver}`}</p>
          </div>
          <p>Date: {mailData.timestamp}</p>
          </div>
          <div className="mail-content-ctn">{convertHtmlToPlainText(mailData.content)}</div>
        </div>
      )}
    </div>
  );
};

export default MailDataToShow;

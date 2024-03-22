import React, { useEffect, useState } from "react";
import './MailContent.css'
import { useParams } from "react-router-dom";
import authContext from "../Store/Context";
import { useContext } from "react";
import { Card,ListGroup,Form} from "react-bootstrap";

const MailContent = () => {
  const { endpoint } = useParams();
  const authCtx = useContext(authContext);
  const { userEmail } = authCtx;
  const [fetchedData, setFetchedData] = useState([]); 

  useEffect(() => {
    const fetchSentMail = async () => {
      try {
        const response = await fetch(
          `https://mail-box-client-a0c72-default-rtdb.firebaseio.com/${userEmail}/${endpoint}.json`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch mail content");
        }
        else{
         const data = await response.json();
        const mailKeys = Object.keys(data)
        const transformedData = mailKeys.map((mailKey) => ({
          id: mailKey,
          ...data[mailKey]
        }));
          setFetchedData(transformedData)
        }
      }
    catch (error) {
        console.error("Error fetching mail content:", error.message);
      }
    }
    fetchSentMail()
},[])

  console.log(fetchedData)

  return (
    <Card className="ctn-1">
      {fetchedData.map((mail) => (
        <ListGroup>
          <ListGroup.Item key={mail.id} className="mail-list">
           
              <span>
                <input type="checkbox" id="check" />
              </span>
              <span>TO:{mail.email}</span>
              <span>{mail.subject}</span>
              <span>{mail.content}</span>
            <span>{mail.timestamp}</span>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </Card>
  );
};

export default MailContent;

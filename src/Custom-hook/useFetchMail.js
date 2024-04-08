import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../Store/MailDataSlice";

const useFetchMail = (userEmail, endpoint) => {
  const dispatch = useDispatch();
  const fetchedData = useSelector((state) => state.mail.fetchedData);

  useEffect(() => {
    const fetchMailData = async () => {
      try {
        const response = await fetch(
          `https://mail-box-client-a0c72-default-rtdb.firebaseio.com/mail/${userEmail}/${endpoint}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch mail content");
        }

        const data = await response.json();
        const mailKeys = data === null ? [] : Object.keys(data);

        if (mailKeys.length > fetchedData.length) {
          const newMailKeys = mailKeys.slice(fetchedData.length);
          const newMails = newMailKeys.map((newMailKey) => ({
            id: newMailKey,
            ...data[newMailKey],
          }));

          const updatedFetchedData = [...fetchedData, ...newMails];
          dispatch(mailAction.setFetchedData(updatedFetchedData));
        }

        const transformedData = mailKeys.map((mailKey) => ({
          id: mailKey,
          ...data[mailKey],
        }));

        if (endpoint === "inbox") {
          dispatch(mailAction.setUnreadMail(transformedData));
        }
        dispatch(mailAction.setFetchedData(transformedData));
      } catch (error) {
        console.error("Error fetching mail content:", error.message);
      }
    };

    const intervalId = setInterval(fetchMailData, 200);

    return () => clearInterval(intervalId);
  }, [userEmail, endpoint, dispatch]);
};

export default useFetchMail;

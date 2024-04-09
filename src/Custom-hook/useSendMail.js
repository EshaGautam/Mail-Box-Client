

const useSendEmail = () => {


  const sendEmail = async (userData) => {
    try {
     
      const mailToSend = userData.receiver.replace(/[.@]/g, "");

      const response = await fetch(
        `https://mail-box-client-a0c72-default-rtdb.firebaseio.com/mail/${userData.sender}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const inboxResponse = await fetch(
        `https://mail-box-client-a0c72-default-rtdb.firebaseio.com/mail/${mailToSend}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({ ...userData, read: false }),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (response.ok && inboxResponse.ok) {
    alert("Mail Sent Successfully");
      } else {
        throw new Error("Problem in sending mail");
      }
    } catch (error) {
      alert(error);
    }
  };
return sendEmail

};

export default useSendEmail;

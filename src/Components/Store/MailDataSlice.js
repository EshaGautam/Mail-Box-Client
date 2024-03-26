import { createSlice } from "@reduxjs/toolkit";
import { getAllByDisplayValue } from "@testing-library/react";
import { json } from "react-router";

const mailState = {
    fetchedData:[],
    visibleMail:false,
    readState :false
}

const MailDataSlice = createSlice({
name:'mail',
initialState:mailState,
reducers:{
     setFetchedData(state,action){
        console.log(action.payload)
    state.fetchedData = action.payload
     },
     setVisibleMail(state){
        state.visibleMail=true
     },
     setReadState(state){
        state.readState= true
        const existingMailData = JSON.parse(localStorage.getItem('mailData'))
        localStorage.setItem('mailData',JSON.stringify({...existingMailData,read:true}))
     }
}
})

export const SendEmail=(userData)=>{
    const mailTosend = userData.receiver.replace(/[.@]/g, "")
    return async(dispatch)=>{
        try {
            const data = await fetch(
              `https://mail-box-client-a0c72-default-rtdb.firebaseio.com/mail/${userData.sender}/sent.json`,
              {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                  "content-type": "application/json",
                },
              } 
            );
            const inboxData = await fetch(
              `https://mail-box-client-a0c72-default-rtdb.firebaseio.com/mail/${mailTosend}/inbox.json`,
              {
                method: "POST",
                body: JSON.stringify({...userData,receiver:userData.receiver,read:false}),
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
    }
}
export const ReadMessage = (userEmail, endpoint, mail) => {

    if(endpoint==='inbox'){
        return async (dispatch) => {
            try {
              const response = await fetch(`https://mail-box-client-a0c72-default-rtdb.firebaseio.com/mail/${userEmail}/${endpoint}/${mail.id}.json`, {
                method: 'PUT',
                body: JSON.stringify({ ...mail, read: true }),
                headers: {
                  'Content-Type': 'application/json' 
                }
              });
      
              if (!response.ok) {
                throw new Error(response.statusText);
              }
      
              const data = await response.json();
              alert('Read status changed');
            } catch (error) {
              alert('Error: ' + error.message);
            }
          };
    }
  else{
    return
  }
   
    } 

  

export const fetchMail = (userEmail,endpoint) => {
    console.log(userEmail,endpoint)
    return async (dispatch) => {
      try {
        const response = await fetch(
          `https://mail-box-client-a0c72-default-rtdb.firebaseio.com/mail/${userEmail}/${endpoint}.json`
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch mail content");
        }
  
        const data = await response.json();
        const mailKeys = data==null?[]:Object.keys(data);
        const transformedData = mailKeys?.map((mailKey) => ({
          id: mailKey,
          ...data[mailKey],
        }))||[];

        dispatch(mailAction.setFetchedData(transformedData));
      } catch (error) {
        console.error("Error fetching mail content:", error.message);
    
      }
    };
  };

  export const deleteMail = (userEmail,endpoint,userId)=>{
    return async(dispatch)=>{
        try{
           const response= await fetch(`https://mail-box-client-a0c72-default-rtdb.firebaseio.com/mail/${userEmail}/${endpoint}/${userId}.json`,{
            method:'DELETE'
           })
           if(!response.ok){
            alert('Problem in deleting Mail')
           }
           alert('Successfully Deleted Mail')
        }
        catch(error){
            alert(error)
        }
    }
  }
  
export const mailAction = MailDataSlice.actions
export default MailDataSlice.reducer
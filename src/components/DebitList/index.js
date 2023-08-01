import { useEffect, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { BsArrowDownCircle} from "react-icons/bs";
import {BsPencil} from "react-icons/bs";
import {AiOutlineDelete} from 'react-icons/ai';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditForm from "../EditForm";

const DebitList = (props) => {
  const [formattedDate, setFormattedDate] = useState(""); 
  const { details } = props;

  const { id, transaction_name, category, amount,  date } = details;
  console.log(details);


  const cookiData=Cookies.get("user")
      const userId=JSON.parse(cookiData)
    
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role":"user",
          "x-hasura-user-id":`${userId.id}`
        },
        body:JSON.stringify({id:id})
      };
const deleteFunction= async(close)=>{
     const response=await fetch("https://bursting-gelding-24.hasura.app/api/rest/delete-transaction",options);
     const data=await response.json();
     close()
     console.log(data)
     console.log(id)
     window.location.reload()
}
  const dateFunction = (receivedDate) => {
    const date = new Date(receivedDate);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const formattedDate = `${day} ${month}`;

    // Format the time
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${(hours % 12) || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${amPm}`;
    const formattedDateTime = `${formattedDate}, ${formattedTime}`;
    setFormattedDate(formattedDateTime); 
  };

  useEffect(() => {
    dateFunction(date);
  }, []);

  return (
    <li className="dash-list">

           <BsArrowDownCircle  className="iconer debitColor" />
      
      <p className="paragraph">{transaction_name}</p>
      <div className="list-items">
        
        <p className="paragraph">{category}</p>
        <p className="paragraph">{formattedDate}</p>
          <p className="debitColor">-{amount}</p>
       
      </div>
      <div className="list-items2">

      <div className="popup-container">
   <Popup
     modal
     
     trigger={
       <button type="button" className="iconer2">
       <BsPencil />
       </button>
       
     }
     position="center"
   >
     {close => (
       <>
       <div className="popup">
        <EditForm close={close} id={id} formdata={details}/>
       </div>
       </>
     )}
   </Popup>
 </div>

 <Popup
     modal
     trigger={
      <button className="iconer3" type="button">
      <AiOutlineDelete  />
      </button>
     }
   >
     {close => (
       <>
         <div className="delete-container">
          <img alt="delete-logo" src="https://res.cloudinary.com/ccbp-tech-surya/image/upload/v1690802067/danger_pqkvbv.png" className="delete-logo" />
          <div>
           <p className="delete-content">Are you sure you want to Delete?</p>
           <p className="delete-para">This transaction will be deleted immediately. You can’t undo this action.</p>
           </div>
          
         </div>
         <div className="button-container">
         <button className="delete-button"  onClick={() => deleteFunction(close)}>yes delete</button>
         <button
           type="button"
           className="trigger-button"
           onClick={() => close()}
         >
           No leave it
         </button></div>
       </>
     )}
   </Popup>
       
      </div>
      
    </li>
  );
};

export default DebitList
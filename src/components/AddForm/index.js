import "./index.css"
import {CiCircleRemove} from 'react-icons/ci'
import { useState } from "react"
import Cookies from "js-cookie"
const AddForm=(props)=>{

    const {close}=props
   
    const [userData,setUserData]=useState({
        name:"",
        type:"",
        category:"",
        amount:"",
        date:""
    })

    
    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
      };
      const cookiData=Cookies.get("user")
      const userId=JSON.parse(cookiData)
      const totalData={
        name:userData.name,
        type:userData.type,
        category:userData.category,
        amount:userData.amount,
        date:userData.date,
        user_id:userId.id
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role":"user",
          "x-hasura-user-id":`${userId.id}`
        },
        body:JSON.stringify(totalData)
      };
      const submitFunction= async(event)=>{
        event.preventDefault();
        console.log(totalData)
      try{
       const response=await fetch("https://bursting-gelding-24.hasura.app/api/rest/add-transaction",options);
       const data=await response.json()
       console.log(data)
       close()
       window.location.reload()
      }catch(error){
        console.log(error)
      }

      }
    return(
        <form  className="form" onSubmit={submitFunction}>
            <div className="form-head">
           <div> <h3> Add transaction</h3>
            <span>Lorem ipsum dolor sit amet, consectetur </span></div>
            <button className="cancel-icon" onClick={close}>
                <CiCircleRemove  />
            </button>
            </div>
            <div>
             <label htmlFor="name">Transcation Name</label><br/>
             <input onChange={handleUserInput} value={userData.name} name="name" className="input" id="name" type="text" placeholder="Enter Name" required/><br/>
             <label htmlFor="credit-debit">Transcation Type</label><br/>
             <select name="type" className="select" id="credit-debit" type="text" onChange={handleUserInput} value={userData.type} required>
                <option value="">Select Transcation Type</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
             </select>
             <label htmlFor="name">Category</label><br/>
             <input onChange={handleUserInput} value={userData.category} name="category" id="category" type="text" placeholder="category type" required/><br/>
             <label htmlFor="amount">Amount</label><br/>
             <input onChange={handleUserInput} value={userData.amount} name="amount" id="amount" type="number" placeholder="Enter the amount" required/><br/>
             <label htmlFor="date">Date</label><br/>
             <input onChange={handleUserInput} value={userData.date} name="date" id="date" type="date" placeholder="select date" required/><br/>  
             <button type="submit">Add Transcation</button>
            </div>

        </form>
    )
}
export default AddForm
import "./index.css";
import { useState, useEffect } from "react";
import NavBar from "../NavBar";
import HistoryList from "../HistoryList";
import AddForm from "../AddForm";
import React from 'react';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import AdminHistory from "../AdminHistory";
import 'reactjs-popup/dist/index.css';
import Cookies from "js-cookie";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts"




const Dashboard = () => {
  const [creditData, setCreditData] = useState("");
  const [debitData, setDebitData] = useState("");
  const [transactionData, setTranscationData] = useState([]);
const [sevenDaysData,setSevenDaysData]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cookiData = Cookies.get("user");
  const authenticate=Cookies.get("authenticate");
  const history=useNavigate()

  const userId = JSON.parse(cookiData);
  const DataFormatter = (number) => {
      return number
  }
  let options;
if (userId.id===3){
  options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": "admin",
      
    },
  };
}
else{
   options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": "user",
      "x-hasura-user-id": `${userId.id}`
    },
  };
}
const sevenDaysApi= async()=>{
  try{
    let fetchedData;
    if (userId.id===3){
     const response=await fetch("https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin",options);
     const data = await response.json();
     fetchedData=data.last_7_days_transactions_totals_admin
    }
    else{
    const response = await fetch("https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days", options);
    const data = await response.json();
    fetchedData = (data.last_7_days_transactions_credit_debit_totals);
    }
    setSevenDaysData(fetchedData)
    

  }
  catch(error){
    console.log(error)
  }
}
  const transcationApi = async () => {
    try {
      const response = await fetch('https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=2', options);
      const data = await response.json();
      const fetchedData = data.transactions;
      console.log(fetchedData)
      setTranscationData(fetchedData);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setIsLoading(false); // Set loading to false in case of an error
      console.log(error);
    }
  };



  const apiFunction = async () => {

  let fetchedData;
    if (userId.id===3){
     const response=await fetch("https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin",options);
     const data = await response.json();
     fetchedData=data.transaction_totals_admin
    }
    else{
    const response = await fetch("https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals", options);
    const data = await response.json();
    fetchedData = (data.totals_credit_debit_transactions);
    }
    
    for (let i of fetchedData) {
      if (i.type === "credit") {
        setCreditData(i.sum);
      } else if (i.type === "debit") {
        setDebitData(i.sum);
      }
    }
  };

  useEffect(() => {
    apiFunction();
    transcationApi();
    sevenDaysApi();
    }, []);

const barchartValue=sevenDaysData.filter((each)=>each.type==="debit")
const creditBarchart=sevenDaysData.filter((each)=>each.type==="credit");
const creditArray=creditBarchart.map((each)=>({creditValue:each.sum,date:each.date}));
console.log(creditArray,creditBarchart)

  const BarChartdata = [
    {
      group_name: "Sat",
    
    },
    {
      group_name: "Sun",
  
    },
    {
      group_name: "Mon",
    
    },
    {
      group_name: "Tue",
     
    },
    {
      group_name: "Wed",
   
    },
  {
      group_name: "Thu",
     
  },
  {
      group_name: "Fri"
     
    },
  ]



if (authenticate===undefined){
  history("/")
}

  return (
    <div className='main-container'>
      <NavBar />
      <div className="dash-container">
        <nav className="dash-nav">
          <span>Account</span>
          {userId.id==3?null:
          <Popup
            modal
            trigger={
              <button className="dash-button">+ Add Transcation</button>
            }
            position="center"
          >
            {close => (
              <>
                <div className="popup">
                  <AddForm close={close} />
                </div>
              </>
            )}
          </Popup>}

        </nav>
        {isLoading ? (
          <div className='loading-container'>
            <p>Loading...</p>
            <div className='loader'></div>
          </div>
        ) : (
          <>
            <div className="dash-transcation">
              <div className="dash-credit">
                <p className="dash-para1">$ {creditData}<br />
                  <span>credit</span>
                </p>
                <img src="https://res.cloudinary.com/ccbp-tech-surya/image/upload/v1690712328/Group_erqfi0.png" alt="credit-logo" className="credit-image" />
              </div>
              <div className="dash-credit">
                <p className="dash-para2">$ {debitData}<br />
                  <span>Debit</span> </p>
                <img src="https://res.cloudinary.com/ccbp-tech-surya/image/upload/v1690714774/Group_1_rrzxo3.png" alt="debit-logo" className="debit-image" />
              </div>
            </div>
            <h3 className="heading">Last Transcation</h3>
            <ul className="dash-user-history">
              {userId.id===3?
              (transactionData.length > 0 ? (
                transactionData.map((each) => <AdminHistory key={each.id} details={each} />)
              ) : (
                <li className="paragraph2">There's nothing to show</li>
              )): (transactionData.length > 0 ? (
                transactionData.map((each) => <HistoryList key={each.id} details={each} />)
              ) : (
                <li className="paragraph2">There's nothing to show</li>
              ))}
            </ul>
            <h3 className="heading">Debit&Credit Overview</h3>

            <div className="dash-user-history">
            <ResponsiveContainer width="100%" height={350}>
      <BarChart data={creditArray} margin={{ top: 10 }}>
        <XAxis
          dataKey="date"
          tick={{ stroke: "gray", strokeWidth: 1 }}
        />
        <YAxis
          domain={[100, 500]} // Set the Y-axis domain from 100 to 500
          tickFormatter={DataFormatter}
          tick={{ stroke: "gray", strokeWidth: 0 }}
        />
        <Legend wrapperStyle={{ padding: 30 }} />
        <Bar dataKey="sum" name="Debit" fill="#1f77b4" barSize="20%" />
        <Bar dataKey="creditValue" name="Credit" fill="#fd7f0e" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

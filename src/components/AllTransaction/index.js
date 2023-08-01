import './index.css';
import NavBar from '../NavBar';
import AddForm from "../AddForm";
import React, { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import HistoryList from '../HistoryList';
import { useNavigate } from "react-router-dom";
import CreditList from '../CreditList';
import DebitList from "../DebitList"
import AdminHistory from '../AdminHistory';
import AdminCredit from '../AdminCredit';
import AdminDebit from "../AdminDebit"

const activeFunction = {
  AllTransacation: 'AllTransaction',
  Credit: 'Credit',
  Debit: 'Debit',
};

const AllTransacation = () => {
  const [transactionData, setTranscationData] = useState([]);
  const [creditData,setCreditFilter]=useState([]);
  const [debitData,setDebitFilter]=useState([]);
  const [active, setActive] = useState(activeFunction.AllTransacation);
  const [isLoading, setIsLoading] = useState(true);
  const cookiData = Cookies.get('user');
  const userId = JSON.parse(cookiData);
  const authenticate=Cookies.get("authenticate");
  const history=useNavigate();
  let options;
  if (userId.id===3){
    options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'admin',
        
        
      },
    };
  }
  else{
   options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      'x-hasura-role': 'user',
      'x-hasura-user-id': `${userId.id}`,
    },
  };
}

  const transcationApi = async () => {
    setIsLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch('https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=2', options);
      const data = await response.json();
      const fetchedData = data.transactions;
      setTranscationData(fetchedData);
      const filteredData=fetchedData.filter((each)=>each.type==="credit")
      const debitData=fetchedData.filter((each)=>each.type!=="credit")
      setCreditFilter(filteredData)
      setDebitFilter(debitData)
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setIsLoading(false); // Set loading to false in case of an error
      console.log(error);
    }
  };
  useEffect(() => {
    transcationApi();
  }, []);
  if (authenticate===undefined){
    history("/")
  }
  if(userId.id===3){
    return (
      <div className='main-container'>
        <NavBar />
        <div className='transaction-container'>
          <nav className="transaction-nav">
            <div>
              <span>Transaction</span>
              <div className='transaction-category'>
                <button onClick={() => setActive(activeFunction.AllTransacation)}>All Transaction</button>
                <button onClick={() => setActive(activeFunction.Debit)}>Debit</button>
                <button  onClick={() => setActive(activeFunction.Credit)}>Credit</button>
              </div>
            </div>
       
          </nav>
          <div className='container'>
            {isLoading ? ( // Render loading message while fetching data
              <div className="loading-container">
                <p>Loading...</p>
                <div className='loader'></div>
              </div>
            ) : (
              <ul className="transaction-user-history">
                <li className='lists-admin'>
                  <p>user name</p>
                  
                  <div>
                  <p>TransactionName</p>
                    <p>Category</p>
                    <p>Date</p>
                    <p>Amount</p>
                  </div>
                </li>
                
                {active===activeFunction.AllTransacation &&
                (transactionData.length > 0 ? (
                  transactionData.map((each) => <AdminHistory key={each.id} details={each} />)
                ) : (
                  <li className="paragraph2">There's nothing to show.</li>
                ))}
  
     {active===activeFunction.Credit &&
   (creditData.length > 0 ? (
      creditData.map((each) => <AdminCredit key={each.id} details={each} />)
    ) : (
      <li className="paragraph2">There's nothing to show.</li>
    ))}
  
  {active===activeFunction.Debit &&
   (debitData.length > 0 ? (
      debitData.map((each) => <AdminDebit key={each.id} details={each} />)
    ) : (
      <li className="paragraph2">There's nothing to show.</li>
    ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className='main-container'>
      <NavBar />
      <div className='transaction-container'>
        <nav className="transaction-nav">
          <div>
            <span>Transaction</span>
            <div className='transaction-category'>
              <button onClick={() => setActive(activeFunction.AllTransacation)}>All Transaction</button>
              <button onClick={() => setActive(activeFunction.Debit)}>Debit</button>
              <button  onClick={() => setActive(activeFunction.Credit)}>Credit</button>
            </div>
          </div>
          <Popup
            modal
            trigger={<button className="dash-button">+ Add Transaction</button>}
            position="center"
          >
            {close => (
              <>
                <div className="popup">
                  <AddForm close={close} />
                </div>
              </>
            )}
          </Popup>
        </nav>
        <div className='container'>
          {isLoading ? ( // Render loading message while fetching data
            <div className="loading-container">
              <p>Loading...</p>
              <div className='loader'></div>
            </div>
          ) : (
            <ul className="dash-user-history">
              <li className='lists'>
                <p>TransactionName</p>
                <div>
                  <p>Category</p>
                  <p>Date</p>
                  <p>Amount</p>
                </div>
              </li>
              
              {active===activeFunction.AllTransacation &&
              (transactionData.length > 0 ? (
                transactionData.map((each) => <HistoryList key={each.id} details={each} />)
              ) : (
                <li className="paragraph2">There's nothing to show.</li>
              ))}

   {active===activeFunction.Credit &&
 (creditData.length > 0 ? (
    creditData.map((each) => <CreditList key={each.id} details={each} />)
  ) : (
    <li className="paragraph2">There's nothing to show.</li>
  ))}

{active===activeFunction.Debit &&
 (debitData.length > 0 ? (
    debitData.map((each) => <DebitList key={each.id} details={each} />)
  ) : (
    <li className="paragraph2">There's nothing to show.</li>
  ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default AllTransacation;

import './index.css';
import NavBar from '../NavBar';
import AddForm from "../AddForm";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Profile = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authenticate = Cookies.get("authenticate");
  const cookiData = Cookies.get("user");
  const userId = JSON.parse(cookiData);
  const history = useNavigate();
  let options;

  if (userId.id === 3) {
    options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "admin",
      },
    };
  } else {
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

  const profileApi = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://bursting-gelding-24.hasura.app/api/rest/profile", options);
      const data = await response.json();
      const fetchedData = data.users;
      setUserDetails(fetchedData);
      setIsLoading(false);
      console.log(fetchedData);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    profileApi();
  }, []);

  if (authenticate === undefined) {
    history("/");
  }

  return (
    <div className='main-container'>
      <NavBar />
      <div className='profile-container'>
        <nav className="profile-nav">
          <span>Profile</span>
          {userId.id === 3 ? null :
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
            </Popup>}
        </nav>
        {isLoading ? (
          <div className="loading-container">
            <p>Loading...</p>
            <div className='loader'></div>
          </div>
        ) : (
          <div className="profile-list">
            <img src="https://s3-alpha-sig.figma.com/img/57d3/d250/790e98129931897251abd3915a931233?Expires=1691971200&Signature=YpaWRkaWOMdRC5HT4eTffn-NvDJxxf87hiX0hFvxbYrqmtXgzo2fy1v7-1j3fhGi1i2q8E2sBQ3sDg38jHyhS5UEBGcES6qoFsHXcB0zNpah~C8kKu61euDChDEf2US2RTAKAcyLo41iXSSFuvbwDXp2MKzdu8EPzResV9XNbvy6MC493bdr94WOIT1~c9tQDEBFLnj7xFgchyvFQIbHiVVJGE9l30oM3Lv0h~k-gTag6a-1YqHa502qT0ujMMQ6Lo1QTPnMx2vJHQhhr5CB2s0hgiHyfNLTg44Nz-sqV0-kgBp~2gUgXdRTCA-FrM3noqjsRX1eQxDQxqs7fZfeEQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="profile-logo" className='profile-logo' />
            {userId.id === 3 ? userDetails.length > 0 && (
              <div className='profile-details'>
                <div>
                  <p className='profile-para'>Your Name</p>
                  <button className='profile-para2'>{userDetails[2].name}</button>
                </div>
                <div>
                  <p className='profile-para'>User Name</p>
                  <button className='profile-para2'>{userDetails[2].name}</button>
                </div>
                <div>
                  <p className='profile-para'>Email</p>
                  <button className='profile-para2'>{userDetails[2].email}</button>
                </div>
                <div>
                  <p className='profile-para'>Date Of Birth</p>
                  <button className='profile-para2'>{userDetails[2].date_of_birth}</button>
                </div>
              </div>
            ) : userDetails.length > 0 && (
              <div className='profile-details'>
                <div>
                  <p className='profile-para'>Your Name</p>
                  <button className='profile-para2'>{userDetails[0].name}</button>
                </div>
                <div>
                  <p className='profile-para'>User Name</p>
                  <button className='profile-para2'>{userDetails[0].name}</button>
                </div>
                <div>
                  <p className='profile-para'>Email</p>
                  <button className='profile-para2'>{userDetails[0].email}</button>
                </div>
                <div>
                  <p className='profile-para'>Date Of Birth</p>
                  <button className='profile-para2'>{userDetails[0].date_of_birth}</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

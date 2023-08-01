import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";

import Cookies from "js-cookie";
import "./index.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Update state name to errorMessage

  const history = useNavigate();

  const userFunction = (event) => {
    setUsername(event.target.value);
  };

  const passwordFunction = (event) => {
    setPassword(event.target.value);
  };

  const submitFunction = async (event) => {
    event.preventDefault();
  
    try {
      const options = {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        },
        body: JSON.stringify({ 
          email: username,
          password: password,
        }),
      };
  
      const response = await fetch(
        "https://bursting-gelding-24.hasura.app/api/rest/get-user-id",
        options
      );
  
      const data = await response.json();
      const userId = data.get_user_id[0];
      if (userId) {
        setError(false);
        Cookies.set("user", JSON.stringify(userId), { expires: 1 });
        Cookies.set("authenticate",JSON.stringify(userId),{expires:1});
        history("/Dashboard");
      } else {
        setError(true);
        setErrorMessage("username or password error");
      }
    } catch (error) {
      setError(true);
      console.log(error.response.data.error);
      setErrorMessage(error.response.data.error); // Extract the error message
    }
  };
  
  return (
    <div>
      <div className="main">
        <form onSubmit={submitFunction}>
          <div className="design">
            <BiUser className="icon" />
          </div>
          <h1 className="head">Welcome!</h1>

          <p>
            Let's connect to your space. <br />
            Please enter your details to continue.
          </p>

          <br />
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={userFunction}
            value={username}
          />
          <br />
          <br />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={passwordFunction}
            value={password}
          />
          <br />
     
          <button className="button" type="submit">Log In</button>
          {error ? <p className="error-para">{errorMessage}</p> : null}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

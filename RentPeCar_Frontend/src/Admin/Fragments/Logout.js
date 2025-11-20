import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import React from 'react';

const Logout = () => {
  const history = useHistory();
  const handleLogout=()=>{
    window.sessionStorage.removeItem('user')
    window.sessionStorage.removeItem('isActive')
    history.push('/')
  };

  return (
    <div className="container">
      <br />
      <h4 className="align-items-center d-flex justify-content-center">
        Want to Logout
      </h4>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title align-items-center d-flex justify-content-center">
            Click Here to Logout
          </h5>
          <br />
          
          <a
            href="#"
            className="btn btn-primary align-items-center d-flex justify-content-center"
            onClick={handleLogout}
          >Logout
            
          </a>
        </div>
      </div>
      <br />
      <br />
      <h5 className="align-items-center d-flex justify-content-center">
        Thank You....
      </h5>
    </div>
  );
};

export default Logout;

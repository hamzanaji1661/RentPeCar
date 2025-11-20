import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../../Components/Header";
import { url } from "../../../Commons/constants";

const BookingForm = () => {
  const history = useHistory();

  let isActive = sessionStorage.getItem("isActive");
  let user = JSON.parse(sessionStorage.getItem("user"));
  let carCategory = null;

  if (isActive !== null) {
    carCategory = JSON.parse(sessionStorage.getItem("carCategory"));
  } else {
    history.push("/signin");
  }

  const [location, setLocation] = useState([]);
  const [fromDate, setFromDate] = useState([]);
  const [toDate, setToDate] = useState([]);
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [debitCard, setDebitCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const calculateSecurityDeposit = (from, to) => {
    const date1 = new Date(from);
    const date2 = new Date(to);

    if (!isNaN(date1.getTime()) && !isNaN(date2.getTime()) && date2 >= date1) {
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays);

      const pricePerDay = carCategory.pricePerDay || 0;
      const total = diffDays * pricePerDay;
      setSecurityDeposit(total);
    } else {
      setTotalDays(0);
      setSecurityDeposit("");
    }
  };

  const showPayment = () => {
    if (location.length === 0) {
      alert("Select Location");
    } else if (fromDate.length === 0) {
      alert("Select From Date");
    } else if (toDate.length === 0) {
      alert("Select To Date");
    } else if (toDate < fromDate) {
      alert("To date must be greater than From date");
    } else {
      document.getElementById("payment").style.visibility = "visible";
    }
  };

  const AddDetailsToDB = () => {
    if (securityDeposit.length === 0) {
      alert("Security deposit is required");
    } else {
      const data = new FormData();
      data.append("user", user.data.userid);
      data.append("carCategory", carCategory.id);
      data.append("location", location);
      data.append("fromDate", fromDate);
      data.append("toDate", toDate);
      data.append("securityDeposit", securityDeposit);

      axios.post(url + "/booking/", data).then((response) => {
        const result = response.data;
        if (result.status === "success") {
          alert("Data Submitted Successfully");
          history.push("/");
        } else {
          alert("Error while booking");
        }
      });
    }
  };

  return (
    <div>
      <Header />
      <h1 className="title-header">BookingForm</h1>
      <hr />
      <div className="container">
        <h2>
          <u>
            <b>Booking Details :</b>
          </u>
        </h2>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">
              <b>Name :</b>
            </label>
            <input type="text" className="form-control" value={user.data.username} readOnly />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <b>Email :</b>
            </label>
            <input type="text" className="form-control" value={user.data.email} readOnly />
          </div>
          <div className="col-12">
            <label className="form-label">
              <b>Address :</b>
            </label>
            <input type="text" className="form-control" value={user.data.address} />
          </div>
          <div className="col-12">
            <label className="form-label">
              <b>Car Category Name</b>
            </label>
            <input type="text" className="form-control" value={carCategory.categoryName} readOnly />
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <b>Pick Up Location</b>
            </label>
            <select
              className="form-control"
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select a city</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Rabat">Rabat</option>
              <option value="Marrakech">Marrakech</option>
              <option value="Tanger">Tanger</option>
              <option value="Fes">Fes</option>
              <option value="Agadir">Agadir</option>
              <option value="Essaouira">Essaouira</option>
              <option value="Ouarzazate">Ouarzazate</option>
              <option value="Meknes">Meknes</option>
              <option value="Tetouan">Tetouan</option>
              <option value="Oujda">Oujda</option>
              <option value="Nador">Nador</option>
              <option value="El Jadida">El Jadida</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <b>From Date :</b>
            </label>
            <input
              onChange={(e) => {
                const newFrom = e.target.value;
                setFromDate(newFrom);
                calculateSecurityDeposit(newFrom, toDate);
              }}
              type="date"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <b>To Date :</b>
            </label>
            <input
              onChange={(e) => {
                const newTo = e.target.value;
                setToDate(newTo);
                calculateSecurityDeposit(fromDate, newTo);
              }}
              type="date"
              className="form-control"
            />
          </div>

          <div className="title-header">
            <button className="btn btn-success" onClick={showPayment}>
              Pay Deposit
            </button>
          </div>

          <div className="row g-3" id="payment" style={{ visibility: "hidden" }}>
            <h2>
              <u>
                <b>Payment Details :</b>
              </u>
            </h2>

            <div className="col-md-2">
              <label className="form-label">
                <b>Deposit :</b>
              </label>
              <input
                value={securityDeposit}
                type="text"
                className="form-control"
                readOnly
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                <b>Debit/Credit Card Number :</b>
              </label>
              <input
                onChange={(e) => setDebitCard(e.target.value)}
                type="number"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">
                <b>Expiry Date :</b>
              </label>
              <input
                onChange={(e) => setExpiryDate(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">
                <b>CVV* :</b>
              </label>
              <input
                onChange={(e) => setCvv(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>

            <div className="title-header">
              <button onClick={AddDetailsToDB} className="btn btn-primary">
                Confirm Booking
              </button>
              &nbsp;&nbsp;
              <button onClick={history.goBack} className="btn btn-warning">
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

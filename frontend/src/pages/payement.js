import React, { Fragment, useEffect, useState } from "react";

import { Button, Col, Input, Row } from "reactstrap";
import imgpay from "./images/card_img.png";
import aa from "./images/a.png";
import Qr from "./QRCODE";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import S from "./s.png";

import StripeCheckout from "react-stripe-checkout";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
function Payment() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("95");

  const handleToken = (token) => {
    fetch("/payment/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, amount }),
    })
      .then((res) => res.json())
      .then((_) => {
        window.alert(" Pay event Transaction  Successful.");
      })
      .catch((_) => window.alert("Transaction Failed."));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  return (
    <Fragment>
   
      <div style={{ background: 'radial-gradient(circle, rgba(172,170,171,1) 18%, rgba(255,251,251,1) 100%)'}}
                  

       > <Row> <Col style={{width:50  }} xs="2"> <img style={{marginLeft:200  }}  src={S} alt=""/> </Col>
       <Col>
        <div
          style={{
            border:2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            flexDirection: "column",
            gap: 15,
          }}
        >
         
          <Qr />
          <FormControl sx={{ m: 1 }}>
            <InputLabel>Payment</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={amount}
              onChange={handleAmountChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
              style={{ width: 150, height: 100, alignItems: "center" }}
            />
          </FormControl>
          <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_KEY || ""}
            token={handleToken}
            name=""
            panelLabel={`Pay your Event Here`}
            currency="USD"
            amount={amount * 100}
          ></StripeCheckout>
        </div></Col></Row>
      </div>
    </Fragment>
  );
}

export default Payment;

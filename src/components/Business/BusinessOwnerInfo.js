import React, { useEffect, useState } from "react";
import axios from "axios";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "./businessOwnerInfo.css";

const BusinessOwnerInfo = (props) => {
  // Backend URLS
  let displayURL = "/react-backend/owner/displayOwnerInfo.php";
  let updateURL = "/react-backend/owner/updateOwnerInfo.php";

  // Const for data being sent
  const [formData, setFormData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [message, setMessage] = useState(null);

  // Get the 'old' data to use for placeholder/autofill
  useEffect(() => {
    axios
      .get(displayURL)
      .then((json) => {
        setDisplayData(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // Form Change Handler
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  // Form Submit Handler
  const registerHandler = () => {
    let formData2 = new FormData();
    formData2.append("first_name", formData.first_name);
    formData2.append("last_name", formData.last_name);
    formData2.append("email", formData.email);
    formData2.append("password", formData.password);

    axios
      .post(updateURL, formData2)
      .then((res) => {
        console.log(formData2);
        console.log(res);
        setMessage("Success");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed");
      });
  };

  // Return
  return (
    <div>
      <AvForm className='formOwnerInfo' onValidSubmit={registerHandler}>
        <h1>Edit Owner Info</h1>
        <FormGroup>
          <AvField
            label='First Name'
            type='text'
            name='first_name'
            placeholder={displayData.first_name}
            onChange={(e) => {
              onChange(e);
            }}
            required
          />
          <AvField
            label='Last Name'
            type='text'
            name='last_name'
            placeholder={displayData.last_name}
            onChange={(e) => {
              onChange(e);
            }}
            required
          />
          <AvField
            label='Email'
            type='text'
            name='email'
            placeholder={displayData.email}
            onChange={(e) => {
              onChange(e);
            }}
            required
          />

          <AvField
            label='Password'
            type='password'
            name='password'
            onChange={(e) => {
              onChange(e);
            }}
            required
          />
        </FormGroup>
        <FormGroup>
          <p className={message === "Success" ? "suc" : "fail"}>{message}</p>
          <Button color='success'>Submit</Button>{" "}
          <Button tag={Link} to='/SelectBusiness'>
            Back
          </Button>{" "}
        </FormGroup>
      </AvForm>
    </div>
  );
};

export default BusinessOwnerInfo;

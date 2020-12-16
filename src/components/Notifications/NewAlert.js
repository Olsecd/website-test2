import React, { useEffect, useState } from "react";
import { AvForm, AvField, AvCheckbox } from "availity-reactstrap-validation";
import {
  Button,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./newAlert.css";

export default function NewAlert() {
  // Get Patron Data for Dropdown Menu
  let url = "/react-backend/business/displayCheckIn.php";
  let sendURL = "/react-backend/business/sendemail/alert.php";
  let displayNotificationUrl =
    "/react-backend/business/displayNotification.php";

  const [message, setMessage] = useState(null);
  const [patronNotification, displayNotification] = useState([]);
  // Modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Store into list
  const [patrons, setPatrons] = useState([]);

  // Store Final Alert as a Const
  const [alert, setAlert] = useState({
    start_date: "",
    end_date: "",
    message: "",
  });

  useEffect(() => {
    // Fetch Checkin Data
    axios
      .get(displayNotificationUrl)
      .then((json) => {
        displayNotification(json.data);
        console.log(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // Register Handler Runs On Valid Submit
  const registerHandler = () => {
    let FormData2 = new FormData();
    FormData2.append("start_date", alert.start_date);
    FormData2.append("end_date", alert.end_date);
    FormData2.append("message", alert.message);

    axios
      .post(sendURL, FormData2)
      .then((res) => {
        console.log(FormData2);
        console.log(res);
        setMessage("Success");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed");
      });
  };
  // Runs on Page Load
  useEffect(() => {
    axios.get(url).then((json) => {
      setPatrons(json.data);
      console.log(json.data);
    });
  }, []);

  // Form Change Handler
  const onChange = (e) => {
    setAlert({ ...alert, [e.target.name]: e.target.value });
    console.log(alert);
  };

  return (
    <div className='formAlert'>
      <p></p>
      <h1>REPORT CASE</h1>
      <h3>ALL CUSTOMERS IN SELECTED DATE RANGE WILL BE NOTIFIED</h3>

      <Button color='secondary' onClick={toggle}>
        <i class='fas fa-question-circle'></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <p>Report New Case</p>
        </ModalHeader>
        <ModalBody>
          <p>
            To protect the privacy of the patient, COVID cases are to be
            reported anonymously. Simply select a date range. Any customers who
            were checked-in on those dates will be notified of the positive
            case.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>

      <AvForm onValidSubmit={registerHandler}>
        <FormGroup>
          <AvField
            label='Start'
            type='date'
            name='start_date'
            onChange={(e) => {
              onChange(e);
            }}
          />
          <AvField
            label='End'
            type='date'
            name='end_date'
            onChange={(e) => {
              onChange(e);
            }}
          />
        </FormGroup>
        <FormGroup>
          <AvField
            label='Message (Optional)'
            type='textarea'
            name='message'
            onChange={(e) => {
              onChange(e);
            }}
          />
        </FormGroup>
        <FormGroup>
          <p className={message === "Success" ? "suc" : "fail"}>{message}</p>
          <Button color='danger'>
            <i style={{ color: "white" }} class='fas fa-exclamation-triangle' />{" "}
            Report
          </Button>
          <Button tag={Link} to='/BusinessMain'>
            Back
          </Button>{" "}
        </FormGroup>
        {patronNotification.positive_date && (
          <p className='fail'>
            Your most recent COVID-19 alert at this business was on{" "}
            {patronNotification.positive_date}
          </p>
        )}
      </AvForm>
    </div>
  );
}

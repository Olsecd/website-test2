import React, {
  List,
  Component,
  useState,
  setState,
  useEffect,
  setData,
} from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Table,
  Toast,
  ToastBody,
  ToastHeader,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import "./selectbusiness.css";

const SelectBusiness = (props) => {
  let urlAll = "/react-backend/owner/displayAllBusiness.php";
  const [AllBusinesses, showAllBusinesses] = useState([]);
  const [business, setBusiness] = useState();
  const [message, setMessage] = useState(null);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const toggleAdmin = () => setAdminDropdownOpen((prevState) => !prevState);
  useEffect(() => {
    axios
      .get(urlAll)
      .then((json) => {
        showAllBusinesses(json.data);
        console.log(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectButton = (e) => {
    const urlSelect = "/react-backend/owner/selectBusiness.php";
    axios
      .post(urlSelect)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectedBusiness = (e) => {
    //console.log("this is street" + business);
    const urlSelect = "/react-backend/owner/selectBusiness.php";
    axios
      .post(urlSelect, { id: business })
      .then((res) => {
        console.log("this is id" + business);
        console.log(res);
        setMessage("Successful");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed");
      });
  };

  const handleBusiness = (business) => {
    setBusiness(business);
    console.log(business);
  };

  const renderTable = () => {
    return (
      <div className='selectBusiness'>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Street</th>
              <th>Town</th>
              <th>Zip</th>
              <th>County</th>
            </tr>
          </thead>
          <tbody>
            {AllBusinesses.map((AllBusinesses) => {
              return (
                <tr key={AllBusinesses}>
                  <td>{AllBusinesses.name}</td>
                  <td>{AllBusinesses.type}</td>
                  <td>{AllBusinesses.street}</td>
                  <td>{AllBusinesses.town}</td>
                  <td>{AllBusinesses.zip}</td>
                  <td>{AllBusinesses.county}</td>
                  <td>
                    {" "}
                    <input
                      onClick={() => handleBusiness(AllBusinesses.id)}
                      type='radio'
                      value='id'
                      name='id'
                    />{" "}
                    Select this business
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <>
      <h1> Select a business</h1>
      <Dropdown isOpen={adminDropdownOpen} toggle={toggleAdmin}>
        <DropdownToggle color='secondary' caret>
          <i class='fas fa-users-cog'></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem tag={Link} to='/BusinessOwnerInfo'>
            <i class='fas fa-user-edit'></i> Change Owner Info
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {renderTable()}
      <Button
        onClick={() => selectedBusiness(business)}
        disabled={!business}
        color='success'
      >
        Select Business
      </Button>{" "}
      {message === "Successful" && <Redirect to='/BusinessMain' />}
      <p></p>
      <Button color='success' tag={Link} to='/AddBusiness'>
        Add Business
      </Button>{" "}
    </>
  );
};

export default SelectBusiness;

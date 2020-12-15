import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import "./PatronMain.css";
import { Link } from "react-router-dom";
/*
PHP Code    
$display_table[$i] = ["name" => $business_row['name'], "type" => $business_row['type'],
 "email" => $business_row['email'], "phone" => $business_row['phone'], 
 "street" => $business_row['street'], "town" => $business_row['town'], 
 "zip" => $business_row['zip'], "temperature" => $spreadsheet_row['temperature'], 
 "sheet_date" => $spreadsheet_row['sheet_date']];
*/
const PatronMain = (props) => {
  let url = "/react-backend/patron/displayVisitedLocation.php";
  let alertURL = "/react-backend/patron/sendNotification.php";

  const [formData, setFormdata] = useState({
    start_date: "",
    end_date: "",
    date_of_test: "",
  });

  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const alertHandler = () => {
    let formData2 = new FormData();
    formData2.append("start_date", formData.start_date);
    formData2.append("end_date", formData.end_date);
    formData2.append("date_of_test", formData.date_of_test);
    console.log("clicked");

    const urlNotification = "/react-backend/patron/sendNotification.php";
    axios

      .post(urlNotification, formData2)
      //HERE URL WILL EQUAL BACKEND API LINK (POST API LINK.)
      //  firstName: String(FormData.firstName),
      //  lastName: String(FormData.lastName),
      //  email: String(FormData.email),
      //  password: String(FormData.password),
      //})
      .then((res) => {
        console.log(res);
        setMessage("Successful");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed");
      });
  };

  // Modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  // The actual data fetched
  const [rows, setRows] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  // Column headings for MDBreact table
  const columns = [
    {
      label: "Business",
      field: "name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Type",
      field: "type",
      sort: "asc",
      width: 270,
    },
    {
      label: "Email",
      field: "email",
      sort: "des",
      width: 200,
    },
    {
      label: "Phone",
      field: "phone",
      sort: "desc",
      width: 100,
    },
    {
      label: "Street",
      field: "street",
      sort: "asc",
      width: 150,
    },
    {
      label: "Town",
      field: "town",
      sort: "des",
      width: 200,
    },
    {
      label: "Zip",
      field: "zip",
      sort: "desc",
      width: 100,
    },
    {
      label: "Temperature",
      field: "temperature",
      sort: "des",
      width: 200,
    },
    {
      label: "Date",
      field: "sheet_date",
      sort: "desc",
      width: 100,
    },
  ];

  // Fetching the data
  useEffect(() => {
    axios.get(url).then((json) => {
      setRows(json.data);
      //console.log(json.data);
    });
  });

  // Merge columns + rows so it works with MDBDataTable
  const tableData = { columns, rows };

  // Render Table Function. Creates Sortable Table with MDB React
  const renderTable = () => {
    return (
      <MDBDataTable
        label='Past Businesses'
        hover
        striped
        bordered
        data={tableData}
      />
    );
  };

  return (
    <div className='formPatronMain'>
      <aside>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle color='secondary'>
            <i class='fas fa-cog'></i>
          </DropdownToggle>
          <DropdownMenu>
            {/* Link to PatronInfo */}
            <DropdownItem tag={Link} to='/PatronInfo'>
              <i class='fas fa-share-square'></i>Edit Info
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Button color='danger' onClick={toggleModal}>
          <i class='fas fa-exclamation-triangle'></i>
        </Button>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Report New Case</ModalHeader>
          <ModalBody>
            <h2>CAUTION!</h2>{" "}
            <p>
              You are about to inform all previously visited businesses that you
              have tested postive for COVID-19 on this current date. Your
              personal information will be kept secret in accordance with
              protections under the Health Information Privacy Act.
            </p>
          </ModalBody>
          <AvForm>
            <ModalFooter>
              <AvField
                type='date'
                name='start_date'
                label='Start Date'
                onChange={(e) => {
                  onChange(e);
                }}
                required
              />
              <AvField
                type='date'
                name='end_date'
                label='End Date'
                onChange={(e) => {
                  onChange(e);
                }}
                required
              />
              <AvField
                type='date'
                name='date_of_test'
                label='Date of Positive Test Result'
                onChange={(e) => {
                  onChange(e);
                }}
                required
              />
              <Button
                color='danger'
                onClick={alertHandler}
                //formAction={alertHandler}
              >
                REPORT
              </Button>

              <Button color='secondary' onClick={toggleModal}>
                CLOSE
              </Button>
              <p className={message === "Successful" ? "suc" : "fail"}>
                {message}
              </p>
            </ModalFooter>
          </AvForm>
        </Modal>
      </aside>

      <section>
        <div>
          <h1>COVID-19 Tracker</h1>
          <h3>Patron Home Page</h3>
          <Button color='primary' tag={Link} to='/SearchBusiness'>
            Search Businesses
          </Button>
          {renderTable()}
        </div>
      </section>
    </div>
  );
};

export default PatronMain;

import React, { useEffect, useState, setPageLoading } from "react";
import axios, { CancelToken } from "axios";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import "./BusinessSearch.css";

// $business_info[$i] = ["name" => $row['name'], "type" => $row['type'], "street" => $row['street'], "town" => $row['town'], "zip" => $row['zip'], "county" => $row['county']];

const BusinessSearch = () => {
  let url = "/react-backend/displayAllBusiness.php";
  let postUrl = "/react-backend/selectBusinessReview.php";

  const [allBusinesses, setAllBusinesses] = useState([]);
  const [business, setBusiness] = useState();
  const [message, setMessage] = useState();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((json) => {
        setRows(json.data);
        setAllBusinesses(json.data);
        console.log(json.data || " ");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectedBusiness = (e) => {
    axios
      .post(postUrl, { id: business })
      .then((res) => {
        console.log("Business ID: " + business);
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

  const table = [
    {
      addBtn: (
        <button className='btn btn-primary' onClick={() => this.addToCart()}>
          Add
        </button>
      ),
    },
  ];

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
      label: "Street",
      field: "street",
      sort: "asc",
      width: 150,
    },
    {
      label: "Town",
      field: "town",
      sort: "asc",
      width: 200,
    },
    {
      label: "Zip",
      field: "zip",
      sort: "asc",
      width: 100,
    },
    {
      label: "County",
      field: "county",
      sort: "asc",
      width: 100,
    },
    {
      label: "Select",
      field: "",
    },
  ];

  // Merge columns + rows so it works with MDBDataTable
  const tableData = { columns, rows };
  // Render Table Function. Creates Sortable Table with MDB React
  const renderTable2 = () => {
    return <MDBDataTable striped bordered data={tableData} />;
  };

  const renderTable = () => {
    return (
      <div className='businessSearch'>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Street</th>
              <th>Town</th>
              <th>Zip</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {allBusinesses.map((b) => {
              return (
                <tr key={b}>
                  <td>{b.name}</td>
                  <td>{b.type}</td>
                  <td>{b.street}</td>
                  <td>{b.town}</td>
                  <td>{b.zip}</td>
                  <td>{b.county}</td>
                  <input
                    onClick={() => handleBusiness(b.id)}
                    type='radio'
                    value='id'
                    name='id'
                  />{" "}
                  Select
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
      <h1>Select a Business</h1>
      {renderTable()};{/* {renderTable2()}; */}
      <Button
        onClick={() => selectedBusiness(business)}
        color='success'
        tag={Link}
        to='/ViewBusiness'
        disabled={!business}
      >
        Visit Business Page
      </Button>
    </>
  );
};

export default BusinessSearch;

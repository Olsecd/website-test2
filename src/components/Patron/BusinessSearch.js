import React, { useEffect, useState, setPageLoading } from "react";
import axios, { CancelToken } from "axios";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";

// $business_info[$i] = ["name" => $row['name'], "type" => $row['type'], "street" => $row['street'], "town" => $row['town'], "zip" => $row['zip'], "county" => $row['county']];

const BusinessSearch = () => {
  let url = "/react-backend/displayAllBusiness.php";
  let postUrl = "/react-backend/selectBusinessReview.php";

  const [allBusinesses, setAllBusinesses] = useState([]);
  const [business, setBusiness] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    axios
      .get(url)
      .then((json) => {
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

  const renderTable = () => {
    return (
      <div>
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
      {renderTable()};
      <Button
        onClick={() => selectedBusiness(business)}
        color='success'
        tag={Link}
        to='/ViewBusiness'
      >
        Visit Business Page
      </Button>
    </>
  );
};

export default BusinessSearch;

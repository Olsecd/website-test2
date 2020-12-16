import React, { useEffect, useState, setPageLoading } from "react";
import axios, { CancelToken } from "axios";
import { Button, Table, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import "./BusinessSearch.css";
import { AvForm, AvField } from "availity-reactstrap-validation";

// $business_info[$i] = ["name" => $row['name'], "type" => $row['type'], "street" => $row['street'], "town" => $row['town'], "zip" => $row['zip'], "county" => $row['county']];

const BusinessSearch = () => {
  let url = "/react-backend/displayAllBusiness.php";
  let postUrl = "/react-backend/selectBusinessReview.php";
  let searchUrl = "/react-backend/searchBusiness.php";
  const [formData, setFormdata] = useState({
    search_by: "",
    search_for: "",
  });
  const onChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const [allBusinesses, setAllBusinesses] = useState([]);
  const [business, setBusiness] = useState();

  const registerHandler = () => {
    let formData2 = new FormData();
    formData2.append("search_by", formData.search_by);
    formData2.append("search_for", formData.search_for);

    axios

      .post(searchUrl, formData2)
      //HERE URL WILL EQUAL BACKEND API LINK (POST API LINK.)
      // firstName: String(FormData.firstName),
      // lastName: String(FormData.lastName),
      // email: String(FormData.email),
      // password: String(FormData.password),
      // })
      .then((json) => {
        setAllBusinesses(json.data);
        console.log(json.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(searchUrl)
    //   .then((json) => {
    //     setRows(json.data);
    //     setAllBusinesses(json.data);
    //     console.log(json.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    axios
      .get(url)
      .then((json) => {
        // setRows(json.data);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBusiness = (business) => {
    setBusiness(business);
    console.log(business);
    axios
      .post(postUrl, { id: business })
      .then((res) => {
        console.log("Business ID: " + business);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
                  <td>
                    <input
                      onClick={() => handleBusiness(b.id)}
                      type='radio'
                      value='id'
                      name='id'
                    />{" "}
                    Select
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
    <div className='businessSearch'>
      <h1>Select a Business</h1>
      <AvForm onValidSubmit={registerHandler}>
        <Label>Search by</Label>
        <Input
          type='select'
          name='search_by'
          id='search_by'
          onChange={(e) => {
            onChange(e);
          }}
        >
          <option>Name</option>
          <option>Type</option>
          <option>Street</option>
          <option>Town</option>
          <option>Zip</option>
          <option>County</option>
        </Input>
        <AvField
          label='Search for'
          type='text'
          name='search_for'
          onChange={(e) => {
            onChange(e);
          }}
        />
        <div className='businessSearch'>
          <Button>Search</Button>
          <Button
            onClick={() =>
              axios
                .get(url)
                .then((json) => {
                  // setRows(json.data);
                  setAllBusinesses(json.data);
                  console.log(json.data || " ");
                })
                .catch((err) => {
                  console.log(err);
                })
            }
          >
            Reset Search
          </Button>
        </div>
      </AvForm>
      {renderTable()};{/* {renderTable2()}; */}
      <Button
        //onClick={() => selectedBusiness(business)}
        color='success'
        tag={Link}
        to='/ViewBusiness'
        disabled={!business}
      >
        Visit Business Page
      </Button>
    </div>
  );
};

export default BusinessSearch;

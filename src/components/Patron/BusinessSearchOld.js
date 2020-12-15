import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { Link } from "react-router-dom";

const BusinessSearchOld = () => {
  let url = "/react-backend/displayAllBusiness.php";
  //Named Rows so it will work with MDBreact Table
  const [rows, setRows] = useState([]);
  const [business, setBusiness] = useState();
  useEffect(() => {
    axios
      .get(url)
      .then((json) => {
        setRows(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleBusiness = (business) => {
    setBusiness(business);
    console.log(business);
  };

  const table = [
    {
      addBtn: (
        <input
          onClick={() => handleBusiness(business.id)}
          type='radio'
          value='id'
          name='id'
        />
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
      field: table[0].addBtn,
    },
  ];
  //rows: table,

  // Merge columns + rows so it works with MDBDataTable

  const tableData = { columns, rows };

  // Render Table Function. Creates Sortable Table with MDB React
  const renderTable = () => {
    return <MDBDataTable striped hover bordered data={tableData} />;
  };

  return <div>{renderTable()}</div>;
};
export default BusinessSearchOld;

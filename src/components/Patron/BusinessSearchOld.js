import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BusinessSearch.css";

const BusinessSearchOld = () => {
  let url =
    "https://health.data.ny.gov/resource/xdss-u53e.json?$order=test_date%20DESC&$limit=62";
  //Named Rows so it will work with MDBreact Table
  const [rows, setRows] = useState([]);

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

  // Column headings for MDBreact table
  const columns = [
    {
      label: "Test Date",
      field: "test_date",
      sort: "asc",
      width: 150,
    },
    {
      label: "County",
      field: "county",
      sort: "asc",
      width: 270,
    },
    {
      label: "New Positives",
      field: "new_positives",
      sort: "asc",
      width: 150,
    },
    {
      label: "Cumulative Number of Positives",
      field: "cumulative_number_of_positives",
      sort: "asc",
      width: 200,
    },
    {
      label: "Total Number of Tests",
      field: "total_number_of_tests",
      sort: "asc",
      width: 100,
    },
    {
      label: "Cumulative Number of Tests",
      field: "cumulative_number_of_tests",
      sort: "asc",
      width: 100,
    },
  ];

  // Merge columns + rows so it works with MDBDataTable
  rows.link = "HELP";
  const tableData = { columns, rows };

  // Render Table Function. Creates Sortable Table with MDB React
  const renderTable = () => {
    return (
      <MDBDataTable striped paging={false} hover bordered data={tableData} />
    );
  };

  return <div className='businessSearch'>{renderTable()}</div>;
};
export default BusinessSearchOld;

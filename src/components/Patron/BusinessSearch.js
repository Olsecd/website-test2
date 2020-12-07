import React, { useEffect, useState } from "react";
import axios from "axios";
import { matchSorter } from "match-sorter";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
// $business_info[$i] = ["name" => $row['name'], "type" => $row['type'], "street" => $row['street'], "town" => $row['town'], "zip" => $row['zip'], "county" => $row['county']];

// Import React Table
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

const BusinessSearch = () => {
  let url = "/react-backend/displayAllBusiness.php";
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((json) => {
        setBusiness(json.data);
        console.log(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      <ReactTable
        data={business}
        filterable
        defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value
        }
        columns={[
          {
            Header: "Name",
            accessor: "name",
            filterMethod: (filter, row) =>
              row[filter.id].startsWith(filter.value) &&
              row[filter.id].endsWith(filter.value),
          },
          {
            Header: "Type",
            id: "type",
            accessor: "type",
          },
          {
            Header: "Street",
            accessor: "street",
          },
          {
            Header: "Town",
            accessor: "town",
            id: "over",
          },
          {
            Header: "Zip",
            accessor: "zip",
          },
          {
            Header: "County",
            accessor: "county",
          },
          {
            Header: "Select",
            Cell: ({ value }) => (
              <Button color='primary' tag={Link} to='/SearchBusiness'>
                View Page
              </Button>
            ),
          },
        ]}
        defaultPageSize={10}
        className='-striped -highlight'
      />
      <br />
    </div>
  );
};

export default BusinessSearch;

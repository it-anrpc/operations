import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import AddForm from "./AddForm";
import { TextField } from "@mui/material";

const NOServerData = (props) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  if (props.Error) {
    return (
      <div>
        <Alert severity="error" className="m-5">
          {props.Error}
        </Alert>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const Main = (props) => {
  const [error, setError] = useState("");
  const [dbData, setdbData] = useState([]);
  const [dbColumns, setdbColumns] = useState([]);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = () => {
    axios({
      method: "get",
      url: "/api/shiftLog",
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (res) {
        //handle success
        if ((res.status = 200)) {
          if (res.data.result.length > 0) {
            const data = res.data.result.map((item) => {
              return Object.values(item);
            });
            setdbData(res.data.result);
            let merged = Object.keys(res.data.result[0]).concat(columns);
            setdbColumns(merged);
          }
        } else {
          setError(" Error user name or password");
        }
      })
      .catch(function (res) {
        //handle error
        setError(" Error user name or password");
        return;
      });
  };

  /*   const columns = [
    "shift ID",
    "unit",
    "TIME_OPEN",
    "TIME_CLOSED",
    "OPENED_BY",
    "CLOSED_BY",
    "EQUIBMENT",
    "DESCREPTION",
    "STATUS",
  ]; */

  /*   const options = {
    filterType: "checkbox",
  }; */

  const columns = [
    /*    {
      name: "Name",
      options: {
        filter: true,
      },
    },
    {
      label: "Modified Title Label",
      name: "Title",
      options: {
        filter: true,
      },
    },
    {
      name: "Location",
      options: {
        filter: false,
      },
    },
    {
      name: "Age",
      options: {
        filter: true,
      },
    },
    {
      name: "Salary",
      options: {
        filter: true,
        sort: false,
      },
    }, */
    {
      name: "Add",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <button
              onClick={() => {
                const { data } = this.state;
                data.unshift([
                  "Mason Ray",
                  "Computer Scientist",
                  "San Francisco",
                  39,
                  "$142,000",
                ]);
                this.setState({ data });
              }}
            >
              Add
            </button>
          );
        },
      },
    },
    {
      name: "Delete",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <button
              onClick={() => {
                const { data } = this.state;
                data.shift();
                this.setState({ data });
              }}
            >
              Delete
            </button>
          );
        },
      },
    },
    {
      name: "Edit",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <button
              onClick={() =>
                window.alert(
                  `Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`
                )
              }
            >
              Edit
            </button>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    onColumnSortChange: (changedColumn, direction) =>
      console.log("changedColumn: ", changedColumn, "direction: ", direction),
    onChangeRowsPerPage: (numberOfRows) =>
      console.log("numberOfRows: ", numberOfRows),
    onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
  };
  return (
    <div>
      <Layout />
      <h1> main page</h1>
      <div>
        <AddForm
          callBackNewRow={(newObject) => {
            getTableData();
          }}
        />
      </div>
      <div>
        <NOServerData Error={error} />
      </div>
      <MUIDataTable title={"Employee List"} data={dbData} columns={dbColumns} />
    </div>
  );
};

export default Main;

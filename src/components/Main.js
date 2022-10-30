import React, { useEffect } from "react";
import Layout from "./Layout";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";

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
  const [error, setError] = React.useState("");
  const [dbData, setdbData] = React.useState([]);
  const [dbColumns, setdbdbColumns] = React.useState([]);

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
            setdbData(data);
            setdbdbColumns(Object.keys(res.data.result[0]));
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

  const columns = [
    "shift ID",
    "unit",
    "TIME_OPEN",
    "TIME_CLOSED",
    "OPENED_BY",
    "CLOSED_BY",
    "EQUIBMENT",
    "DESCREPTION",
    "STATUS",
  ];

  const options = {
    filterType: "checkbox",
  };
  return (
    <div>
      <Layout />
      <h1> main page</h1>
      <div>
        <NOServerData Error={error} />
      </div>
      <MUIDataTable
        title={"Employee List"}
        data={dbData}
        columns={dbColumns}
        options={options}
      />
    </div>
  );
};

export default Main;

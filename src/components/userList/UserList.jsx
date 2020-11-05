import React, { useState, useEffect } from "react";
import styles from "./UserList.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import Delete from "@material-ui/icons/Delete";
import Swal from "sweetalert2";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UserList() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, [user]);

  const getUser = async () => {
    try {
      const users = await Axios({
        method: "get",
        url: "https://pacific-oasis-23064.herokuapp.com/user",
        headers: {
          token: localStorage.getItem("tokenAdmin"),
        },
      });
      setUser(users.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const actualRemove = async (id) => {
    try {
      const remove = await Axios({
        method: "delete",
        url: `https://pacific-oasis-23064.herokuapp.com/user/delete/${id}`,
        headers: {
          token: localStorage.getItem("tokenAdmin"),
        },
      });
      console.log("remove response", remove);
      Swal.fire("Deleted!", `this user has been deleted.`, "success");
    } catch (error) {}
  };

  const deleteAlert = (id) => {
    Swal.fire({
      title: `Delete this User?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        actualRemove(id);
      }
    });
  };

  const classes = useStyles();
  return (
    <div className={styles.UserList}>
      <div className={styles.TabbleWrapper}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.full_name ? row.full_name : "null"}
                  </TableCell>
                  <TableCell>{row.email ? row.email : "null"}</TableCell>
                  <TableCell>
                    <button
                      className={styles.DeleteButton}
                      onClick={() => deleteAlert(row._id)}
                    >
                      <Delete fontSize={"large"} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

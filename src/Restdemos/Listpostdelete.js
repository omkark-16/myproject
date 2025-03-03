import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './ListPostdelete.module.css';
const ListPostdelete = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    axios
      .get("http://localhost:8081/api/getrecords")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
      });
  };
  
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/deleteRecord/${id}`)
      .then(() => {
        alert("Record deleted successfully!");
        setRecords(records.filter((record) => record.id !== id));
      })
      .catch((error) => {
        alert("Failed to delete record.");
      });
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Index</th>
            <th>Date</th>
            <th>Opening Balance</th>
            <th>Online Sale</th>
            <th>Expenses</th>
            <th>Total Counter</th>
            <th>Total Sell</th>
            <th>Delete Record</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record,index) => (
              <tr key={record.id}>
                <td>{index + 1}</td>
                <td>{record.date}</td>
                <td>{record.openingBalance}</td>
                <td>{record.onlineSales}</td>
                <td>{record.expenses}</td>
                <td>{record.totalCounter}</td>
                <td>{record.result}</td>
                <td>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListPostdelete;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './ListRecordsWithUpdate.module.css';

const ListRecordsWithUpdate = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 
  useEffect(() => {
    axios.get("http://localhost:8081/api/getrecords")
      .then(response => setRecords(response.data))
      .catch(error => console.error("Error fetching records:", error));
  }, []);

  const handleEdit = (record) => {
    setSelectedRecord(record); 
    setIsEditing(true); 
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/api/updateRecord/${selectedRecord.id}`, selectedRecord)
      .then(response => {
        alert("Record updated successfully!");
        setRecords(records.map(record => (record.id === selectedRecord.id ? selectedRecord : record)));
        setSelectedRecord(null); 
        setIsEditing(false); 
      })
      .catch(error => {
        console.error("Error updating record:", error);
        alert("Error updating record.");
      });
  };

  return (
    <div className={styles.container}>
    
      <table className={`${styles.table} ${isEditing ? styles.blurred : ''}`}>
        <thead>
          <tr>
            <th>Index</th>
            <th>Date</th>
            <th>Opening Balance</th>
            <th>Online Sale</th>
            <th>Expenses</th>
            <th>Total Counter</th>
            <th>Edit record</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ?(
          records.map((record, index) => (
            <tr key={record.id}>
              <td>{index + 1}</td>
              <td>{record.date}</td>
              <td>{record.openingBalance}</td>
              <td>{record.onlineSales}</td>
              <td>{record.expenses}</td>
              <td>{record.totalCounter}</td>
              <td>
                <button onClick={() => handleEdit(record)} className={styles.editButton}>Edit</button>
              </td>
            </tr>
          ))):( <tr>
            <td colSpan="8">No records found.</td>
          </tr>)}
        </tbody>
      </table>

      {isEditing && selectedRecord && (
        <div className={styles.overlay}>
          <form onSubmit={handleUpdate} className={styles.updateForm}>
            <h3>Update Record</h3>
            <div>
              <label>Opening Balance: </label>
              <input
                type="number"
                value={selectedRecord.openingBalance}
                onChange={(e) => setSelectedRecord({ ...selectedRecord, openingBalance: e.target.value })}
              />
            </div>
            <div>
              <label>Online Sale: </label>
              <input
                type="number"
                value={selectedRecord.onlineSales}
                onChange={(e) => setSelectedRecord({ ...selectedRecord, onlineSales: e.target.value })}
              />
            </div>
            <div>
              <label>Expenses: </label>
              <input
                type="number"
                value={selectedRecord.expenses}
                onChange={(e) => setSelectedRecord({ ...selectedRecord, expenses: e.target.value })}
              />
            </div>
            <div>
              <label>Total Counter: </label>
              <input
                type="number"
                value={selectedRecord.totalCounter}
                onChange={(e) => setSelectedRecord({ ...selectedRecord, totalCounter: e.target.value })}
              />
            </div>
            <button type="submit" className={styles.updateButton}>Update Record</button>
            <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListRecordsWithUpdate;

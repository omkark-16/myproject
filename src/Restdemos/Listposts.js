import axios from 'axios';
import { useEffect, useState } from "react";
import styles from './Listposts.module.css';

export default function Listpost() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);  

  useEffect(() => {
    axios.get("http://localhost:8081/api/getrecords")
      .then(res => {
        if (res.data.length === 0) {
          setPost([]);
        } else {
          setPost(res.data); 
        }
        setLoading(false); 
      })
      .catch(err => {
        console.log(err);
        setError(true); 
        setLoading(false); 
      });
  }, []);

  const productlist = post.map((v, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{v.date}</td>
      <td>{v.openingBalance}</td>
      <td>{v.onlineSales}</td>
      <td>{v.expenses}</td>
      <td>{v.totalCounter}</td>
      <td>{v.result}</td>
    </tr>
  ));

  return (
    <div className={styles.container}>
      {loading ? (
        <div className="loader"></div> 
      ) : error ? (
        <div className="error-message">Something went wrong. Please try again later.</div> 
      ) : post.length === 0 ? (
        <div className="no-data">Record Not Found</div> 
      ) : (
        <table className={styles.table} border="2">
          <thead>
            <tr style={{ visibility: post.length === 0 ? 'hidden' : 'visible' }}>
              <th>No</th>
              <th>Date</th>
              <th>Opening Balance</th>
              <th>Online Sale</th>
              <th>Expenses</th>
              <th>Total Counter</th>
              <th>Total Sell</th>
            </tr>
          </thead>
          <tbody>{productlist}</tbody>
        </table>
      )}
    </div>
  );
}

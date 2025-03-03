import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Listpostinset.module.css';

const ListPostsInset = () => {
  const [openingBalance, setOpeningBalance] = useState('');
  const [onlineSales, setOnlineSales] = useState('');
  const [expenses, setExpenses] = useState('');
  const [totalCounter, setTotalCounter] = useState('');
  const [result, setResult] = useState('');
  const [date, setDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [message, setMessage] = useState(''); 
  const [messageType, setMessageType] = useState(''); 

  useEffect(() => {
    const openingBalanceNum = parseFloat(openingBalance) || 0;
    const onlineSalesNum = parseFloat(onlineSales) || 0;
    const expensesNum = parseFloat(expenses) || 0;
    const totalCounterNum = parseFloat(totalCounter) || 0;

    const resultf = (expensesNum + onlineSalesNum + totalCounterNum) - openingBalanceNum;
    setResult(resultf.toFixed(2));
  }, [openingBalance, onlineSales, expenses, totalCounter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    setMessage(''); 

    const localDate = date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0] : '';

    const record = {
      openingBalance: parseFloat(openingBalance),
      onlineSales: parseFloat(onlineSales),
      expenses: parseFloat(expenses),
      totalCounter: parseFloat(totalCounter),
      result: parseFloat(result),
      date: localDate,
    };

    console.log('Sending record:', record);

    axios.post('http://localhost:8081/api/saveRecord', record)
      .then(response => {
        console.log('Record saved:', response.data);
        setMessage('Record saved successfully!');
        setMessageType('success'); 
      })
      .catch(error => {
        console.error('There was an error saving the record:', error);
        setMessage('Error saving record!');
        setMessageType('error'); 
      })
      .finally(() => {
        setIsSubmitting(false); 
        setTimeout(() => {
          setMessage(''); 
        }, 3000);
      });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Submit Product Record</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Opening Balance: </label>
          <input
            type="number"
            value={openingBalance}
            onChange={(e) => setOpeningBalance(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div>
          <label className={styles.label}>Online Sales: </label>
          <input
            type="number"
            value={onlineSales}
            onChange={(e) => setOnlineSales(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div>
          <label className={styles.label}>Expenses: </label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div>
          <label className={styles.label}>ToDays Counter: </label>
          <input
            type="number"
            value={totalCounter}
            onChange={(e) => setTotalCounter(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div>
          <label className={styles.label}>Total Sell (Auto-calculated): </label>
          <input
            type="text"
            value={result}
            className={styles.input}
            readOnly
          />
        </div>
        <div>
          <label className={styles.label}>Date: </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="yyyy-MM-dd"
            className={styles.input}
            required
          />
        </div>

        {isSubmitting && <div className={styles.loader}></div>}

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {message && (
        <div className={`${styles.confirmationContainer} ${messageType === 'error' ? styles.error : ''}`}>
          <div className={styles.confirmationMessage}>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPostsInset;

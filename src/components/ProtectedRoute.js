import React from 'react';

const ProtectedRoute = ({ element }) => {

  let heading={
    color: 'lightblue',
    padding: '10px',
    textAlign: 'center',
    fontSize: '30px',
    width: '100%',
    paddingTop: '20%',
    zIndex: 100,
  }
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return isAuthenticated ? element : <h2 style={heading}>Please login first...!</h2>;
};

export default ProtectedRoute;
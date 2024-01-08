import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';


const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    navigate(`/`, { replace: true })
  );
};

export default PrivateRoute;
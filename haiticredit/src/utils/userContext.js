import React, { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUserNIF: action.payload };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { currentUserNIF: null });

  const setUser = (userNIF) => {
    dispatch({ type: 'SET_USER', payload: userNIF });
  };

  return (
    <UserContext.Provider value={{ currentUserNIF: state.currentUserNIF, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUserContext };

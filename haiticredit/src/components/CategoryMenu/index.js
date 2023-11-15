import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_BORROWER,
  // UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import {  GET_BORROWERS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { categories } = state;

  const { loading, data: borrowerData } = useQuery( GET_BORROWERS);

  useEffect(() => {
    if (borrowerData ) {
      dispatch({
        type: UPDATE_BORROWER,
      });
    } 
    else if (!loading) {
      idbPromise('categories', 'get').then((borrower) => {
        dispatch({
          type: UPDATE_BORROWER,
          // categories: categories,
        });
      });
    }
  }, [borrowerData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      // type: UPDATE_CURRENT_CATEGORY,
      // currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;

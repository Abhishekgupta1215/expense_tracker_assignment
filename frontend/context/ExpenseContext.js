import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from './AuthContext';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      fetchExpenses();
      fetchSummary();
    } else {
      setExpenses([]);
      setSummary({});
    }
  }, [token]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/expenses');
      setExpenses(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load expenses. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await api.get('/expenses/summary');
      setSummary(res.data);
    } catch (err) {
      console.log('Error fetching summary', err);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const res = await api.post('/expenses', expenseData);
      setExpenses([res.data, ...expenses]);
      fetchSummary();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const res = await api.put(`/expenses/${id}`, expenseData);
      setExpenses(expenses.map(e => e._id === id ? res.data : e));
      fetchSummary();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(e => e._id !== id));
      fetchSummary();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      summary,
      loading,
      error,
      fetchExpenses,
      addExpense,
      updateExpense,
      deleteExpense
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

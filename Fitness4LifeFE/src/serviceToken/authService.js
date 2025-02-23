import axios from 'axios';

import { userAPI } from "../components/helpers/constants";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${userAPI}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ email, password })  // Sửa lỗi JSON.stringify
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json(); // Sửa lỗi response.data.json()
    return result;

  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred while logging in.');
    } else if (error.request) {
      throw new Error('No response from server. Please try again later.');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const registerUser = async (newData) => {
  try {
    const response = await fetch(`${userAPI}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(newData)
    });

    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data || 'An error occurred'
    } else {
      return error.message || 'An unexpected error occurred'
    }
  }
};

export const getUserByEmail = async (email, token) => {
  const response = await fetch(`${userAPI}/users/get-by-email?email=${email}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  return response.json();
};

export const changePassword = async (data, token) => {
  const response = await fetch(`${userAPI}/users/change-pass`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Added this header
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to change password');
  }

  return response.json();
};


export const verifyOTP = async (otp) => {
  try {
    const response = await fetch(`${userAPI}/users/verify-account/${otp}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data || 'An error occurred'
    } else {
      return error.message || 'An unexpected error occurred'
    }
  }
};
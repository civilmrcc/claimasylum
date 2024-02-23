import axios from "axios";
import React from "react";
import { API_URL } from "../helpers/variables";

const useData = () => {
  const sendFormData = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/userdata`, {formdata:data});
      return response
    } catch (err) {
      throw err
    }
  };

  const getFormData = async (data) => {
    try {
      const response = await axios.get(`${API_URL}/userdata`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const postAccessData = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/accessdata`, data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    sendFormData,
    getFormData,
    postAccessData,
  };
};

export default useData;

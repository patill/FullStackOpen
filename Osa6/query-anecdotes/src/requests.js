import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = () => {
  return axios.get(baseUrl).then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export const postNew = (anecdote) => {
  return axios.post(baseUrl, anecdote).then((res) => res.data);
};

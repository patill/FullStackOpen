import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = () => {
  return axios.get(baseUrl).then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export const postNew = (anecdote) => {
  return axios.post(baseUrl, { ...anecdote, votes: 0 }).then((res) => res.data);
};

export const voteAnecdote = async (anecdote) => {
  const voted = { ...anecdote, votes: anecdote.votes + 1 };
  const result = await axios.put(`${baseUrl}/${voted.id}`, voted);
  return result;
};

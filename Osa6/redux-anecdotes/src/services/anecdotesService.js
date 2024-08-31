import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const saveVote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const voting = { ...response.data, votes: response.data.votes + 1 };
  const voted = await axios.put(`${baseUrl}/${id}`, voting);
  return voted;
};

export default { getAll, createNew, saveVote };

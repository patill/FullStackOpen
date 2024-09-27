import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const response = await axios.get(`${baseUrl}/${id}/comments`);
  return response.data;
};

const postNew = async (id, text) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, {
    text,
    blog: id,
  });
  return res.data;
};

export default { getAll, postNew };

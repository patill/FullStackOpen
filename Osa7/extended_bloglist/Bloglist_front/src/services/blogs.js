import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const newBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  console.log(response);
  return response.data;
};

const update = async (blog) => {
  const url = `${baseUrl}/${blog._id}`;
  console.log(url);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.patch(url, blog, config);
  return response.data;
};

const remove = async (id) => {
  const url = `${baseUrl}/${id}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(url, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, newBlog, update, remove };

import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(baseUrl, config);
  return request.data;
};

const create = async (newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, newBlogObject, config);
  return request.data;
};

const update = async (newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(
    `${baseUrl}/${newBlogObject.id}`,
    newBlogObject,
    config
  );
  return request.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${blogId}`, config);
};

export default { getAll, setToken, create, update, deleteBlog };

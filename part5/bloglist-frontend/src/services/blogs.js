import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const update = async (blogObj, blogId) => {
  const url = `${baseUrl}/${blogId}`
  const response = await axios.put(url, blogObj)
  return response.data
}

const remove = async (blogId) => {
  const url = `${baseUrl}/${blogId}`
  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.delete(url, blogObj, config)
  return response.data
}

export default { getAll, create, update, remove, setToken }
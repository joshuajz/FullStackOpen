import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
const addBlog = async (credentials, token) => {
  const response = await axios.post(baseUrl, credentials, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}
const blogPut = async (credentials) => {
  const cred = {
    user: credentials.user.id,
    likes: credentials.likes,
    author: credentials.author,
    title: credentials.title,
    url: credentials.url,
  }
  const response = await axios.put(`${baseUrl}/${credentials.id}`, cred)
  return response.data
}

export default { getAll, addBlog, blogPut }

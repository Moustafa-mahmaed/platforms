// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// const create = (baseURL = 'http://192.168.1.100:8000') => {
  const create = (baseURL = 'https://forums.influancy.com') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
     
      
  
      
    },
    timeout: 10000
  })

  /* ------------- fetch country------------- */

const Country = ( headers) =>
api.get(`/api/countries`,{}, headers)
  /* ------------- Authentication ------------- */

  const login = data => api.post(`/api/login`, data)
  const loginwithsocial = data => api.post(`/api/social`, data)
  const signup = data => api.post(`/api/register`, data)

  /* ------------- Categories ------------- */

  const categories = ({ category, page = '', tag = '' }, headers) =>
    api.get(
      `/api/${category}${page && `?page=${page}`}${tag && `&tag=${tag}`}`,
      {},
      headers
    )

  const categoriesFeaturedItems = ({ category }, headers) =>
    api.get(`/api/${category}?featured`, {}, headers)

  /* ------------- Single Post ------------- */

  const post = ({ category, id }, headers) =>
    api.get(`/api/${category}/${id}`, {}, headers)




  /* ------------- Tags ------------- */

  const tags = ({ category }, headers) =>
    api.get(`/api/tags/${category}`, {}, headers)


      /* --------- ---- form ------------- */
   const Forms = data => api.post(`/api/questions`, data)

   /* -------------------  comment  ----------------------*/
   const comment = data => api.post(`/api/replies`, data)

  return {
    login,
    signup,
    loginwithsocial,
    categories,
    categoriesFeaturedItems,
    post,
    tags,
    Forms,
    comment,
    Country
  }
}

export default {
  create
}

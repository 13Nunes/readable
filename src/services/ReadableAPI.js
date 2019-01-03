const api = process.env.REACT_APP_API_SERVER;

let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token,
};

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

export const getPostsByCategory = (categoryName) =>
  fetch(`${api}/${categoryName}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))


export const increaseVotes = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: 'upVote' })
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

export const decreaseVotes = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: 'downVote' })
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))


export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
    .catch(error => console.log(error))


export const addPost = (postData) =>
  fetch(`${api}/posts`, {
    headers,
    method: 'POST',
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

export const editPost = (postData) =>
  fetch(`${api}/posts/${postData.id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

export const addComment = (commentData) =>
  fetch(`${api}/comments`, {
    headers,
    method: 'POST',
    body: JSON.stringify(commentData)
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))


export const increaseCommentVotes = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: 'upVote' })
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

export const decreaseCommentVotes = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: 'downVote' })
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

export const editComment = (commentData) =>
  fetch(`${api}/comments/${commentData.id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(commentData)
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))
const api = 'http://localhost:3001';

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
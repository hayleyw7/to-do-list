export const getLists = () => {
  return fetch('https://tdlist-api.herokuapp.com/api/version1/tdlists', {
    method : "GET"
  })
  .then(res => res.json())
}

export const postList = (newList) => {
  return fetch('https://tdlist-api.herokuapp.com/api/version1/tdlists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newList),
  })
  .then(res => res.json())
}

export const deleteList = (id) => {
  return fetch(`https://tdlist-api.herokuapp.com/api/version1/tdlists/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
}

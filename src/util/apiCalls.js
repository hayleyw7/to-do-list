export const getLists = () => {
  return fetch('https://tdlist-api.herokuapp.com/api/version1/tdlists', {
    method : "GET"
  })
  .then(res => res.json())
}

// export const deleteList = () => {
//   return fetch('https://tdlist-api.herokuapp.com/api/version1/tdlists', {
//     method: 'DELETE'
//   })
//   .then(res => res.json())
// }

export const getData = (url) => {
  return fetch(url, {
    method : "GET",
    mode: 'cors',
    headers: {}
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  })
}
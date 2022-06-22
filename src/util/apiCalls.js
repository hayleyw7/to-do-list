import update from "immutability-helper";

export const getList = () => {
  return fetch('https://td-list-api.herokuapp.com/api/version1/tdlists', {
    method : "GET"
  })
  .then(res => res.json())
};

export const postTask = (newList) => {
  return fetch('https://td-list-api.herokuapp.com/api/version1/tdlists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newList),
  })
  .then(res => res.json())
};

export const deleteTask = (id) => {
  return fetch(`https://td-list-api.herokuapp.com/api/version1/tdlists/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

export const modifyTask = (e, tdlist, setList) => {
  return fetch(`https://td-list-api.herokuapp.com/api/version1/tdlists/${tdlist.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tdlist: { done: e.target.checked } })
  })
  .then((res) => {
    
    var index = list.findIndex((list) => 
      list.id === res.data.id
    );

    var list = update(list, {
      [index]: { $set: res.data },
    });

    setList(list);
  });
};
import update from "immutability-helper";

export const getLists = () => {
  return fetch('https://td-list-api.herokuapp.com/api/version1/tdlists', {
    method : "GET"
  })
  .then(res => res.json())
};

export const postList = (newList) => {
  return fetch('https://td-list-api.herokuapp.com/api/version1/tdlists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newList),
  })
  .then(res => res.json())
};

export const deleteList = (id) => {
  return fetch(`https://td-list-api.herokuapp.com/api/version1/tdlists/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

export const modifyTdlist = (e, tdlist, setTdlists) => {
  return fetch(`https://td-list-api.herokuapp.com/api/version1/tdlists/${tdlist.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tdlist: { done: e.target.checked } })
  })
  .then((res) => {
    
    var index = tdlists.findIndex((list) => 
      list.id === res.data.id
    );

    var tdlists = update(tdlists, {
      [index]: { $set: res.data },
    });

    setTdlists(tdlists);
  });
};
const movieList = (state = [], action) => {
  if(action===undefined){
    return state
  }

  switch (action.type) {
    case "ADD_MOVIE":
      return [
        ...state,
        {
          title: action.title,
          poster: action.poster,
          parent: action.parent,
          id: action.id
        }
      ]
    default:
      return state;
  }
}

export {movieList}

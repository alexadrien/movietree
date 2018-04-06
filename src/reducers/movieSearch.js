const movieSearch = (state = [], action) => {
  if(action===undefined){
    return state
  }

  switch (action.type) {
    case "ADD_MOVIE_SEARCH":
      return [
        ...state,
        {
          title: action.title,
          poster: action.poster,
          id: action.id
        }
      ]
    case "REMOVE_ALL":
      return []
    default:
      return state;
  }
}

export {movieSearch}

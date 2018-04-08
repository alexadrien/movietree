import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {movieList as movieListReducer} from './reducers/movieList.js'
import {movieSearch as movieSearchReducer} from './reducers/movieSearch.js'
import {createStore, combineReducers} from 'redux'
import axios from 'axios'

const addThatMovie = (movie) => {
  const currentState = store.getState().movieList
  for(var i in currentState){
    if(currentState[i].id == movie.id){
      return
    }
  }
  store.dispatch({
    type: "ADD_MOVIE",
    title: movie.title,
    poster: movie.poster,
    parent: movie.parent,
    id: movie.id
  })
}

const onGetSimilarClick = (movie, parentIndex) => {
  const completeUrl ='https://api.themoviedb.org/3/movie/'
    + movie.id
    + '/recommendations?api_key=' + process.env.REACT_APP_TMDB_API_KEY + ''
  axios.get(completeUrl, {
      header: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      for(var i=0; i<response.data.results.length; i++){
        addThatMovie({
          title: response.data.results[i].title,
          poster: "https://image.tmdb.org/t/p/w500" + response.data.results[i].poster_path,
          id: response.data.results[i].id,
          parent: parentIndex
        })
      }
    }).catch(function (error) {
      console.log(error);
    }
  );
}

const Movie = ({index}) => {
  const currentState = store.getState().movieList
  const currentMovie = currentState[index]
  const currentMovieSimilars = []
  for (var i = 0; i < currentState.length; i++) {
    if (currentState[i].parent === index) {
      currentMovieSimilars.push(i)
    }
  }
  return (
    <div>
      <div>
        <img src={currentMovie.poster} alt={currentMovie.title} width="200px" onClick={()=>{if(currentMovieSimilars.length==0){onGetSimilarClick(currentMovie, index)}}}/></div>
      <div>
        <ul>
          {currentMovieSimilars.map((item, key) =>
            <li key={key}><Movie index={item}/></li>
          )}
        </ul>
      </div>
    </div>
  )
}

const onSearchChange = () => {
  const completeUrl ='https://api.themoviedb.org/3/search/movie'
    + '?api_key=' + process.env.REACT_APP_TMDB_API_KEY
    + '&query='
    + document.getElementById("searchField").value
  axios.get(completeUrl, {
      header: {
        "Content-Type": "application/json"
      }
    })
    .then(function (response) {
      store.dispatch({type:"REMOVE_ALL"})
      console.log(response.data.results)
      for(var i=0; i<response.data.results.length; i++){
        store.dispatch({
          type:"ADD_MOVIE_SEARCH",
          title: response.data.results[i].title,
          poster: response.data.results[i].poster_path != null ? "https://image.tmdb.org/t/p/w500" + response.data.results[i].poster_path : "",
          id: response.data.results[i].id,
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    }
  );
}

const addRootMovie = (movie) => {
  addThatMovie({
    title: movie.title,
    poster: movie.poster,
    id: movie.id
  })
}

const SearchBox = () => {
  const currentState = store.getState().movieSearch
  return(
    <div>
      <input id="searchField" type="text" placeholder="movie title" onChange={onSearchChange}/>
      <ul>
        {currentState.map((item, key)=>
          <li key={key}>
            <img src={item.poster} alt={item.title} width="100px" onClick={()=>{addRootMovie(item)}}/>
            <p>{item.title}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const currentState = store.getState()
  return (
    <div>
      {currentState.movieList.length == 0 &&
        <SearchBox />
      }
      {currentState.movieList.length != 0 &&
        <Movie index={0}/>
      }
    </div>
  )
}

const render = () => {
  ReactDOM.render(<App/>, document.getElementById('root'));
  registerServiceWorker();
}
const reducers = combineReducers({
  movieList: movieListReducer,
  movieSearch: movieSearchReducer
})
const store = createStore(reducers)
store.subscribe(render)
render()

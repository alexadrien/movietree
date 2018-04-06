import {movieList} from './movieList.js'
import assert from 'assert'

describe("movieList function", ()=>{
  it('Should return initial state', ()=>{
    assert.deepEqual(movieList(undefined, {}), [])
    assert.deepEqual(movieList(undefined, undefined), [])
    assert.deepEqual(movieList({}), [])
  })
  it('should handle ADD_MOVIE', ()=>{
    assert.deepEqual(movieList([], {
      type: "ADD_MOVIE",
      title:"jumanji",
      poster: "https://goo.gl/Lskexe"
    }), [
      {
        title:"jumanji",
        poster: "https://goo.gl/Lskexe",
        parent: null
      }
    ])
    assert.deepEqual(movieList([], {
      type: "ADD_MOVIE",
      title:"jumanji",
      poster: "https://goo.gl/Lskexe",
      parent: 4
    }), [
      {
        title:"jumanji",
        poster: "https://goo.gl/Lskexe",
        parent: 4
      }
    ])
    assert.deepEqual(movieList([
      {
        title:"jumanji",
        poster: "https://goo.gl/Lskexe",
        parent: 4
      }
    ], {
      type: "ADD_MOVIE",
      title:"jumanji",
      poster: "https://goo.gl/Lskexe",
      parent: 4
    }), [
      {
        title:"jumanji",
        poster: "https://goo.gl/Lskexe",
        parent: 4
      },
      {
        title:"jumanji",
        poster: "https://goo.gl/Lskexe",
        parent: 4
      }
    ])
  })
})

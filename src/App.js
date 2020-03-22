import React from 'react';
import logo from './logo.svg';
import './App.css';


const List = (props) => {

  return (
    <div>
      {props.list.map(
        (item) =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
      )}
    </div>
  )
}

const Search = (props) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    props.onSearch(e)
  }
  
  return(
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  )
}

const App = () => {

  const [searchTerm, setSearchTerm] = React.useState('')

  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const searchedStories = stories.filter( 
      (story) => story.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch}/>
      <hr/>
      <List list={searchedStories}/>
    </div>
  );
}

export default App;

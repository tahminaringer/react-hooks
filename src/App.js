import React, { Component, useState, useEffect } from "react";

const App = () => {
  //state
  const [news, setNews] = useState();
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] =useState('http://hn.algolia.com/api/v1/search?query=react');
  const [loading, setLoading] = useState(false);
  
  // fetches news
  const fetchNews = () => {

    //set loading to true
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    // .then(data => console.log('DATA', data))
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  }, [url])

const handleChange = (e) => {
  setSearchQuery(e.target.value);
}

// only brings up the data after button is hit
const handleSubmit = e => {
  e.preventDefault();
  setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
}

const showLoading = () => (loading ? <h2> Loading...</h2> : '')

const searchForm = () => (
      <form onSubmit={handleSubmit}>
        <input type='text' value={searchQuery} onChange={handleChange}/>
        <button>Search</button>
      </form>
)

const showNews = () => {
  return news.map((news, i) => (
    <p key={i}>{news.title}</p>
    ))
}

  return(
    <div>
      <h2>News</h2>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div>
  );
};

// class App extends Component {
//   state = {
//     count: 0
//   };
//   increment = () => {
//     this.setState({
//       count: this.state.count + 1
//     });
//   };

//   componentDidMount() {
//     document.title = `Clicked ${this.state.count} times`
//   }

//   componentDidUpdate() {
//     document.title = `Clicked ${this.state.count} times`
//   }

//   render() {
//     return (
//       <div>
//         <h2>Counter App</h2>
//         <button onClick={this.increment}>
//           Clicked {this.state.count} times
//       </button>
//       </div>
//     );
//   }
// }

// //hooks
// const App = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     document.title = `Clicked ${count} times`;
//   })

//   const increment = () => {
//     setCount(count + 1);
//   }

//   return (
//     <div>
//       <h2>Counter App</h2>
//       <button onClick={increment}>
//         Clicked {count} times
//       </button>
//     </div>
//   )

// }

export default App;

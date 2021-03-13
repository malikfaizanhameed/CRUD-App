import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [ movieName, setMovieName ] = useState('');
  const [ review, setReview ] = useState('');
  const [ reviewList, setReviewList ] = useState([]);
  const [ newReview, setNewReview ] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/get').then((response) => {
      setReviewList(response.data);
    })
  }, []);

  const submitReview = () => {
    console.log('Submittd to DB!', movieName, review);
    axios.post('http://localhost:3001/api/insert', { movieName: movieName, movieReview: review });
    setReviewList([...reviewList, { movieName: movieName, movieReview: review }]);
    setMovieName('');
    setReview('');
  };

  const deleteReview = (movie) => {
    axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    console.log(newReview);
    axios.put("http://localhost:3001/api/update", { movieName: movie, movieReview: newReview });
    setNewReview('');
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      
      <div className="form">
        <label>Movie Name:</label>
        <input 
        value={movieName}
          type="text" 
          name="movieName" 
          onChange={(e) => {
            setMovieName(e.target.value);
          }} 
        />
        <label>Review:</label>
        <input 
          value={review}
          type="text" 
          name="review" 
          onChange={(e) => {
            setReview(e.target.value)
          }}
        />

        <button onClick={submitReview}>SUBMIT</button>

        {reviewList.map( val => {
          return <div key={val.id} className="card">
                    <h2>{val.movieName}</h2>
                    <p>{val.movieReview}</p>
                    <button onClick={() => deleteReview(val.movieName)}>DELETE</button>
                    <input type="text" className="updateInput" onChange={(e) => { setNewReview(e.target.value) }} />
                    <button onClick={() => updateReview(val.movieName)}>UPDATE</button>
                </div>
        })}
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <section class="login">
        <h1>SPOTTERFLY</h1> 
        <p>Share your playlists with people near you with similar tastes.</p>
        <p>Discover new music.</p>
        <a href="http://localhost:8888/login"><button id="login-button"><b>LOG IN WITH SPOTIFY</b></button></a>
      </section>
      <footer>Copyright © Seulmin Ryu, Yena Park, Alexander Goldman, Zhongheng Sun 2019</footer>
    </div>
  );
}

export default App;
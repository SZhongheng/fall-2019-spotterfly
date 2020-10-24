import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";
import setTitle from "../setTitle";
import axios from "axios";

function TracksItem(props) {
  const name = props.obj;
  const pics = props.pics;
  var index = props.index;
  const audio = props.audio;
  const link = props.link;

  return (
    <li>
      <div className="tracks-item">
        <span>{name}</span>
        <br></br>
        <br></br>
        <a
          href={`https://open.spotify.com/track/${link[index]}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={pics[index]}
            width="300"
            height="300"
            alt="We don't have the images. Sorry :("
          />
        </a>

        <br></br>
        <audio
          controls
          src={audio[index]}
          alt="we don't have the audio. Sorry :("
        />
        <br></br>
      </div>
    </li>
  );
}
function ArtistItem(props) {
  const name = props.obj;
  const pics = props.pics;
  var index = props.index;
  const artlink = props.artlink;
  return (
    <li>
      <div className="artist-item">
        <span>{name}</span>
        <br></br>
        <br></br>
        <a href={`${artlink[index]}`} target="_blank" rel="noopener noreferrer">
          <img
            src={pics[index]}
            width="300"
            height="300"
            alt="We don't have the images. Sorry :("
          />
        </a>
        <br></br>
        <br></br>
      </div>
    </li>
  );
}

//decorator design pattern
@setTitle(props => {
  //if(!props.user) return 'Loading friends...'
  return "Profile";
})
class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      user: "",
      datas: [],
      imagez: [],
      artist: [],
      artistimage: [],
      previewURL: [],
      songid: [],
      artistlink: []
    };
  }

  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams = urlParams.toString();
    var fields = urlParams.split("=");
    const id = fields[1];
    const url = `http://localhost:8888/playlistdata/${id}`;

    axios.get(url).then(res => {
      var song_array = [];
      var songid_array = [];
      var song_image_array = [];
      var artist_array = [];
      var artist_image_array = [];
      var previewURL_array = [];
      var artistlink_array = [];
      var i;
      //Just get the top 10 songs
      if (res.data.songName.length >= 10) {
        for (i = 0; i < 10; i++) {
          songid_array.push(res.data.songID[i]);
          song_array.push(res.data.songName[i]);
          song_image_array.push(res.data.image[i]);
          previewURL_array.push(res.data.previewURL[i]);
        }
      } else {
        for (i = 0; i < res.data.songName.length; i++) {
          songid_array.push(res.data.songID[i]);
          song_array.push(res.data.songName[i]);
          song_image_array.push(res.data.image[i]);
          previewURL_array.push(res.data.previewURL[i]);
        }
      }

      var j;
      // Just get the top 10 Artists
      if (res.data.artist.length >= 10) {
        for (j = 0; j < 10; j++) {
          artist_array.push(res.data.artist[j]);
          artist_image_array.push(res.data.artistImage[j]);
          artistlink_array.push(res.data.artistlink[j]);
        }
      } else {
        for (j = 0; j < res.data.artist.length; j++) {
          artist_array.push(res.data.artist[j]);
          artist_image_array.push(res.data.artistImage[j]);
          artistlink_array.push(res.data.artistlink[j]);
        }
      }

      this.setState({
        id: res.data.id,
        user: res.data.displayName,
        datas: song_array,
        imagez: song_image_array,
        artist: artist_array,
        artistimage: artist_image_array,
        previewURL: previewURL_array,
        songid: songid_array,
        artistlink: artistlink_array
      });
    });
  }

  logout() {
    this.props.logoutHandler();
  }

  render() {
    var top_tracks = this.state.datas;
    var top_tracks_pics = this.state.imagez;
    var top_artists = this.state.artist;
    var top_artists_pics = this.state.artistimage;
    var previewURL = this.state.previewURL;
    var top_song_id = this.state.songid;
    var artistURL = this.state.artistlink;

    return (
      <section className="profile">
        <div class="App-background2">
          <nav>
            <div>
              <a href={`http://localhost:8888/login`}>
                <Link to="/profile">
                  <img
                    id="profile-icon"
                    src="/icons/profile.png"
                    width="50"
                    height="50"
                    alt="Profile"
                  ></img>
                </Link>
              </a>
            </div>
            <div>
              <a href={`/friends?user=${this.state.id}`}>
                <Link to="/friends">
                  <img
                    id="friends-icon"
                    src="/icons/friends.png"
                    width="50"
                    height="50"
                    alt="Friends"
                  ></img>
                </Link>
              </a>
            </div>
            <div id="logout">
              <a
                role="button"
                onClick={() => {
                  const url = "https://www.spotify.com/en/logout/";
                  const spotifyLogoutWindow = window.open(
                    url,
                    "Spotify Logout",
                    "width=700,height=500,top=40,left=40"
                  );
                  setTimeout(() => spotifyLogoutWindow.close(), 1000);
                }}
                href="/"
              >
                <img
                  id="logout-icon"
                  src="/icons/logout.png"
                  width="50"
                  height="50"
                  alt="Log Out"
                ></img>
              </a>
            </div>
          </nav>

          <br></br>
          <main>
            <div className="wrapper">
              <a
                href={`https://open.spotify.com/user/${this.state.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button id="user-button">
                  <img
                    src="/icons/logo.png"
                    width="20"
                    height="20"
                    alt="none.png"
                  ></img>

                  <b>{this.state.user}'s Profile</b>
                </button>
              </a>
            </div>
            <article id="top">
              <div className="items">
                <ol>
                  <p className="labels">Top Tracks</p>
                  {top_tracks.map((object, i) => {
                    return (
                      <TracksItem
                        obj={object}
                        link={top_song_id}
                        pics={top_tracks_pics}
                        audio={previewURL}
                        index={i}
                      ></TracksItem>
                    );
                  })}
                </ol>
              </div>

              <div className="items">
                <ol>
                  <p className="labels">Top Artists</p>
                  {top_artists.map((object, i) => {
                    return (
                      <ArtistItem
                        obj={object}
                        pics={top_artists_pics}
                        artlink={artistURL}
                        index={i}
                      ></ArtistItem>
                    );
                  })}
                </ol>
              </div>
            </article>
          </main>
        </div>
      </section>
    );
  }
}
export default Artists;

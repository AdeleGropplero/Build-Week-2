const URL = "//https:/striveschool-api.herokuapp.com/api/deezer/";
const artistURL = "artist/";
const AlbumUrl = "album/";

const getArtist = (andPoint, URLid) => {
  fetch(URL + andPoint + URLid, {
    headers: {
      "x-rapidapi-key": "4ab25cbbd8msh65706f56180c0dfp1e6d24jsna3b5d5575bb9",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("I dati non sono stati caricati nel modo giusto");
      }
    })
    .then((artistObj) => {
      console.log(artistObj);
    });
};

const cardArtist = document.getElementById("cardArtist");

window.addEventListener("DOMcontentLoaded", function () {
  getArtist(artistURL, randomicMusicId());
});

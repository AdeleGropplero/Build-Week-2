const URL = "//https:/striveschool-api.herokuapp.com/api/deezer/artist/";

/* const getArtist = (andPoint, URLid) => {
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
}); */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const artistId = params.get("id");

  if (artistId) {
    fetchArtistData(artistId);
  } else {
    console.error("ID artista non trovato nella query string");
  }
});

const fetchArtistData = (id) => {
  const URLendPointArtist = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
  fetch(URLendPointArtist + id, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "a7524d652amshb0c3cd3dd6a3172p181ad3jsn2d82a48da120",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Impossibile recuperare i dati dell'artista");
      }
    })
    .catch((error) => {
      console.error("Errore nel recuperare i dati dell'artista:", error);
    });
};

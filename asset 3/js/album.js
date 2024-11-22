document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn-aside");
  const searchBar = document.getElementById("search-bar");
  const searchContainer = document.getElementById("search-container");
  const recenti = document.getElementById("recentiScoparsa");

  searchBtn.addEventListener("click", function () {
    if (searchBar.style.display === "none") {
      searchBar.style.display = "inline-block";
      searchBar.style.border = "none";
      searchBar.style.backgroundColor = "#222529";
      searchBar.style.borderRadius = "2px";
      searchContainer.style.backgroundColor = "#222529";
      searchContainer.style.borderRadius = "5px";
      searchContainer.style.maxWidth = "80%";
      searchBar.style.maxWidth = "80%";

      recenti.style.display = "none";
    } else {
      searchBar.style.display = "none";
      searchContainer.style.backgroundColor = "#121212";
      recenti.style.display = "block";
    }
  });

  document.addEventListener("click", function (event) {
    if (!searchContainer.contains(event.target)) {
      searchBar.style.display = "none";
      searchContainer.style.backgroundColor = "#121212";
    }
  });
});

/* PARTE GET PER ALBUM PERSONALIZZATO */

const URL = "https://deezerdevs-deezer.p.rapidapi.com/album/";

const fetchAlbumData = (id) => {
  fetch(URL + id, {
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
    .then((album) => {
      console.log(album);

      const cardAlbum = document.getElementById("cardAlbum");

      const albumData = album; // Supponiamo che 'album' contenga i dati dell'album

      // Crea un elemento div principale per l'album
      const albumDiv = document.createElement("div");
      albumDiv.classList.add("album-img", "d-flex", "px-3", "gap-3", "py-4");

      // Crea l'elemento immagine
      const img = document.createElement("img");
      img.classList.add("immagine");
      img.src = albumData.cover_medium;
      img.alt = "Album Cover";
      img.style.maxWidth = "27%";
      img.style.height = "27%";
      img.style.borderRadius = "6px";
      img.style.objectFit = "contain";
      img.style.boxShadow = "2px 1px 10px black";

      albumDiv.appendChild(img);

      /*  if (typeof ColorThief !== "undefined") {
        const colorThief = new ColorThief();

        // Assicurati che l'immagine sia completamente caricata

        if (img.complete) {
          const dominantColor = colorThief.getColor(img); // Restituisce [r, g, b]
         

          albumDiv.style.background = `linear-gradient(to right, rgb(${dominantColor.join(
            ","
          )}), rgba(255, 255, 255, 0.5))`;
        } else {
          img.addEventListener("load", () => {
            const dominantColor = colorThief.getColor(img); // Restituisce [r, g, b]

            // Applica il linear gradient sul div principale con il colore dominante
            albumDiv.style.background = `linear-gradient(to right, rgb(${dominantColor.join(
              ","
            )}), rgba(255, 255, 255, 0.5))`;
          });
        }
      } else {
        console.error("Color Thief non è disponibile!");
      } */

      // Crea il contenitore del titolo e del nome dell'artista
      const titleDiv = document.createElement("div");
      titleDiv.classList.add(
        "album-title",
        "d-flex",
        "flex-column",
        "justify-content-between"
      );

      // Crea e aggiungi il paragrafo "Album"
      const albumText = document.createElement("p");
      albumText.classList.add("py-1");
      albumText.textContent = "Album";
      titleDiv.appendChild(albumText);

      // Crea e aggiungi il titolo dell'album
      const title = document.createElement("h1");
      title.classList.add("fw-bold", "titleAlbum");
      title.textContent = albumData.title;
      titleDiv.appendChild(title);

      // Crea il contenitore per l'artista
      const artistDiv = document.createElement("div");
      artistDiv.classList.add("d-flex", "align-items-baseline");

      // Crea e aggiungi l'immagine dell'artista
      const artistImg = document.createElement("img");
      artistImg.src = albumData.artist.picture_medium;
      artistImg.alt = "Artist Picture";
      artistImg.classList.add("rounded-circle");
      artistImg.style.width = "9%";
      artistImg.style.objectFit = "contain";
      artistDiv.appendChild(artistImg);

      // Crea e aggiungi il nome dell'artista
      const artistNameDiv = document.createElement("div");
      artistNameDiv.classList.add("px-2", "align-self-end");

      const artistName = document.createElement("h6");
      artistName.classList.add("fw-bold");
      artistName.textContent = albumData.artist.name;
      artistNameDiv.appendChild(artistName);

      // Aggiungi il contenitore dell'artista al div principale
      artistDiv.appendChild(artistNameDiv);

      // Aggiungi il contenitore con il titolo e l'artista al div principale
      titleDiv.appendChild(artistDiv);

      // Aggiungi il contenuto dell'album al DOM
      albumDiv.appendChild(titleDiv);
      cardAlbum.appendChild(albumDiv);
    })
    .catch((error) => {
      console.error(error);
    });
};

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const albumId = params.get("id");

  if (albumId) {
    fetchAlbumData(albumId);
  } else {
    console.error("ID artista non trovato nella query string");
  }
});

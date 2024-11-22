const URL = "//https:/striveschool-api.herokuapp.com/api/deezer/album/";

const centralContent = document.querySelectorAll(".centralContent");

if (typeof ColorThief !== "undefined") {
  const colorThief = new ColorThief();
  console.log(colorThief);

  // Per ogni card
  document.addEventListener("DOMContentLoaded", function () {
    // Crea un'istanza di ColorThief
    let colorThief = new ColorThief();

    // Ottieni l'elemento immagine
    let img = document.getElementById("imgAlbum");

    // Assicurati che l'immagine sia completamente caricata
    img.onload = function () {
      // Estrai il colore dominante dall'immagine
      let dominantColor = colorThief.getColor(img);

      // Se vuoi anche un palette di colori
      let colorPalette = colorThief.getPalette(img);

      // Imposta il colore di sfondo del div "centralContent"
      document.getElementById("centralContent").style.backgroundColor =
        "rgb(" + dominantColor.join(",") + ")";
    };

    // Se l'immagine è già caricata, chiamala subito
    if (img.complete) {
      img.onload(); // Esegui la funzione direttamente
    }
  });
}

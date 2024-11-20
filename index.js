/* ------------------------------------------------------------------------------------------------------------ */
/* carosello  aside*/
const content = document.querySelector(".content");
const scrollableContainer = document.querySelector(".scrollable-container");

content.addEventListener("scroll", () => {
  const scrollLeft = content.scrollLeft;

  if (scrollLeft > 0) {
    scrollableContainer.classList.add("start");
  } else {
    scrollableContainer.classList.remove("start");
  }
});

/* caroselli centrali*/

const contentCenter = document.querySelectorAll(".content-center");
const scrollableXContainerCenter = document.querySelectorAll(
  ".scrollableX-container-center"
);
contentCenter.forEach((singleContent) => {
  singleContent.addEventListener("scroll", () => {
    const scrollLeft = singleContent.scrollLeft;

    scrollableXContainerCenter.forEach((singleScrollable) => {
      if (scrollLeft > 0) {
        singleScrollable.classList.add("start");
      } else {
        singleScrollable.classList.remove("start");
      }
    });
  });
});

/* ------------------------------------------------------------------------------------------------------------ */
/* Search aside + dropdown */

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn-aside");
  const searchBar = document.getElementById("search-bar");
  const searchContainer = document.getElementById("search-container");
  const recentiScoparsa = document.getElementById("recentiScoparsa");

  searchBtn.addEventListener("click", function () {
    if (searchBar.style.display === "none") {
      searchBar.style.display = "inline-block";
      recentiScoparsa.style.display = "none";
    } else {
      searchBar.style.display = "none";
      recentiScoparsa.style.display = "inline-block";
    }
  });
});

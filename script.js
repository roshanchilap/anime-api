const api_url = "https://api.jikan.moe/v3";

async function searchAnime(event) {
  event.preventDefault();
  const form = new FormData(this);
  let query = form.get("search");
  console.log(query)
  let res = await fetch(`${api_url}/search/anime?q=${query}&page=1`);
  console.log(res);
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    showAnime(data);
    resetForm();
  } else if (res.ok == false) {
    alert(`Sorry 😔 we could not find any result for "${form.get("search")}".`);
    resetForm();
  }
}

function resetForm() {
  document.getElementById("search").value = "";
}

function showAnime(data) {
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = data.results
    .map((data) => {
      return `
    <div class="card" style="width: 18rem;">
  <img src="${data.image_url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h2 class="card-title">${data.title}</h2>
    <p class="card-text"><q>${data.synopsis}<q></p>
    <p class="card-type"><span class="sp1">Type:</span> ${data.type}</p>
    <p class="card-rating"><span class="sp1">IMDB rating:</span> ⭐${
      data.score
    }</p>
    <p class="card-sdate"><span class="sp1">Start date:</span> ${new Date(
      data.start_date
    ).toDateString()}</p>
    <p class="card-edate"><span class="sp1">End date:</span> ${new Date(
      data.end_date
    ).toDateString()}</p>
  </div>
</div>
    `;
    })
    .join("");
}

function loadAnime() {
  const form = document.getElementById("search-form");
  form.addEventListener("submit", searchAnime);
}

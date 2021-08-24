const api_url = "https://api.jikan.moe/v3"

async function searchAnime(event){

    event.preventDefault();
    const form = new FormData(this)
    
    const query = form.get('search')

    console.log(query)

    fetch(`${api_url}/search/anime?q=${query}&page=1`)
    .then(res =>res.json())
//    .then(data=>console.log(data))
    .then(updateDom)
    
    .catch(err =>console.warn(err.message))
}

function updateDom(data){
const searchResults = document.getElementById('search-results');
searchResults.innerHTML= data.results.map(anime=>{
    return `
    <div class="card" style="width: 18rem;">
  <img src="${anime.image_url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h2 class="card-title">${anime.title}</h2>
    <p class="card-text">${anime.synopsis}</p>
    <p class="card-type">${anime.type}</p>
    <p class="card-rating">IMDB rating: ${anime.score}</p>
    <p class="card-sdate">Start date: ${new Date(anime.start_date).toDateString()}</p>
    <p class="card-edate">End date: ${new Date(anime.end_date).toDateString()}</p>
  </div>
</div>
    `
}).join('')
}


function pageLoaded(){
    const form = document.getElementById('search-form');
    form.addEventListener('submit', searchAnime)
}

window.addEventListener("load", pageLoaded)
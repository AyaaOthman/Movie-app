const API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ab360ca235b9fc857a19e4080e68827b&page=1'
const IMG = 'https://image.tmdb.org/t/p/w1280'
const search = `https://api.themoviedb.org/3/search/movie?api_key=ab360ca235b9fc857a19e4080e68827b&query="`

const searchInput = document.querySelector('.search')
const searchForm = document.querySelector('form')
const mainContainer = document.querySelector('.container')


getMovies(API)
async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

   showData(data.results)
}
function showData(movies){
mainContainer.innerHTML = ''
movies.forEach((movie) => {
    const {title, poster_path, vote_average, overview } = movie
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    movieEl.innerHTML = `
   
    <img src="${IMG + poster_path}" alt="${title}" />
    <div class="info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>


    `
     mainContainer.appendChild(movieEl)
});
}
function getClassByRate(vote){
    if (vote >= 8){
        return 'green'
    } else if(vote >= 5){
        return 'orange'
    } else {
        return 'red'
    }
}
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault()
const searchValue = searchInput.value
if (searchValue !== ''){
    getMovies(search + searchValue )
    searchInput.value = ''
}else{
    window.location.reload()
}
})
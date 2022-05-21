
const API_KEY = 'api_key=42f17cae410e872666dad6a2825dcc72';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL +'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/original';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
const gener ='https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US';  
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const series='https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}?api_key=<<api_key>>&language=en-US'

const requests = {
    fetchNetflixOrignals: `${BASE_URL}/discover/tv?${API_KEY}&with_networks=213`,
    fetchPopular: `${BASE_URL}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${API_KEY}`,
    fetchTrending: `${BASE_URL}/trending/all/week${API_KEY}&language=en=US`,
    fetchActionMovies: `${BASE_URL}/discover/movie?=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?=${API_KEY}&with_genres=35`,
};

getMovie(API_URL);



function getMovie(url) {
    fetch(url).then(res => res.json()).then(data => { 
        console.log(data.results) 
        showMovie(data.results)
    });
}
function showMovie(data) 
{
    main.innerHTML = '';
    data.forEach(movie => {
 
        const{title,poster_path,vote_average,overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_URL+ poster_path}" alt="${title}">
			<div class="movie-info">
			    <h3>${title}</h3>
			    <span class="${getColor(vote_average)}">${vote_average}</span>
			</div>

		    <div class="overview">
			    <h3>Overview</h3>
			    ${overview}
		    </div>
        
        `
        main.appendChild(movieEl);
    })
}
function getColor(vote) {
    if(vote>=8)
    {
        return 'green';
    }
    else if(vote>=5)
    {
        return 'orange';

    }
    else
    {
        return 'red';
    }

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchterm = search.value;
    if(searchterm)
    {
        getMovie(searchURL+'&query='+ searchterm)
    }

})
// used to truncate the string 
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  // banner
  fetch(requests.fetchNetflixOrignals)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.results);
    // every refresh the movie will be change
    const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];
    console.log(setMovie);
    var banner = document.getElementById("banner");
    var banner_title = document.getElementById("banner__title");
    var banner__desc = document.getElementById("banner__description");
    banner.style.backgroundImage = "url(" + IMG_URL + setMovie.backdrop_path + ")";
    banner__desc.innerText = truncate(setMovie.overview, 150);
    banner_title.innerText = setMovie.name;
  })
  

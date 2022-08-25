const API_KEY = 'ebb47b15428ae724ffb682d78a4a3749';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  Headers: {
    'Content-Type': 'application/json;charset=utf8'
  },
  params: {
    'api_key': API_KEY
  }
})
 // Utils
 
 function createItemMovies(movies, container) {
   
   movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie='+movie.id;    });
    
    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+movie.poster_path);
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
 }
 
function createCategoriesList (categories, container){
  
  categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');
    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.innerText = category.name;
    categoryTitle.addEventListener('click', () => {
      location.hash = `category=${category.id}-${category.name}`;
    });
  
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}
// Call to API

async function getMovieById (id){
  const {data: movie} = await api('movie/'+id);
  console.log(movie);
  
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;
  
  movieDetailCategoriesList.innerHTML = '';
  createCategoriesList(movie.genres, movieDetailCategoriesList);
  
  headerSection.style.background = `
    url('https://image.tmdb.org/t/p/w500/'${movie.poster_path}),
    
    linear-gradient (
      180deg,
      rgba(0,0,0,0.35) 19.27%,
      rgba(0,0,0,0) 29.17%
    )
  `;

  getRelatedMoviesId(id)
}

async function getRelatedMoviesId(id) {
  const {data} = await api(`movie/${id}/recommendations`);
  const moviesRecommendations = data.results;
  
  relatedMoviesContainer.innerHTML = '';
  createItemMovies(moviesRecommendations, relatedMoviesContainer);
}

async function getMoviesBySearch (query){
  genericSection.innerHTML = '';
  
  const {data} = await api('search/movie?query='+query);
  
  console.log(data);
  const movies = data.results;
  
  createItemMovies(movies, genericSection);
}

async function getMoviesByCategoty (id){
  genericSection.innerHTML = '';
  
  const {data} = await api('discover/movie?with_genres='+id);
  
  console.log(data);
  const movies = data.results;
  
  createItemMovies(movies, genericSection);
}

async function getTrading (){
  const {data} = await api('trending/movie/day');
  
  const movies = data.results;
  genericSection.innerHTML = '';
  createItemMovies(movies, genericSection);
}


async function getTradingPreview (){
  const {data} = await api('trending/movie/day');
  
  const movies = data.results;
  trendingMoviesPreviewList.innerHTML = '';
  createItemMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview (){
  const {data} = await api('genre/movie/list');
  const categories = data.genres;
  
  categoriesPreviewList.innerHTML = '';
  createCategoriesList(categories, categoriesPreviewList);
}

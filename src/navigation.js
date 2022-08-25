window.addEventListener('DOMContentLoaded', navigation);
window.addEventListener('hashchange', navigation);

searchFormBtn.addEventListener('click', () => {
  location.hash = '#search=' + searchFormInput.value;
});
trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
});
arrowBtn.addEventListener('click', () => {
  window.history.back();
});

function navigation(){
  console.log({location});
  
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoryPage();
  } else {
    homePage();
  }
 
 document.body.scrollTo = 0;
 document.documentElement.scrollTop = 0;
}

function trendsPage (){
  console.log('Trends');
  
  headerSection.classList.remove('header-container--long');
  //headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive');
  
  headerCategoryTitle.innerHTML = 'Tendencias'
  getTrading();
}

function searchPage (){
  console.log('Search');
  
  headerSection.classList.remove('header-container--long');
  //headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive');
  
  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);
}

function movieDetailsPage() {
  console.log('Movie Details');
  
  headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  // ['#movie', '234567']
  /*
  headerSection.classList.add('header-container--long');
  //headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive')
  movieDetailSection.classList.remove('inactive');
  */
  
  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);
}

function categoryPage(){
  console.log('Category Page');
  
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive');
  
  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = location.hash.split('-');
  
  headerCategoryTitle.innerHTML = categoryName;
  getMoviesByCategoty(categoryId);
}

function homePage() {
  console.log('Home');
  getTradingPreview();
  getCategoriesPreview();
  
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  
  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive')
  movieDetailSection.classList.add('inactive');
}

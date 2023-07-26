const apiKey = 'PQqEhpnM7tgFY32zQHURUBssa6egZ2w0';
const apiUrlSearch = 'https://api.giphy.com/v1/gifs/search';
const apiUrlTrending = 'https://api.giphy.com/v1/gifs/trending';

function fetchTrendingGIFs() {
  const url = `${apiUrlTrending}?api_key=${apiKey}&limit=4`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.data)
    .catch(error => {
      console.error('Error fetching trending GIFs:', error);
      return [];
    });
}

function fetchSearchedGIFs(searchTerm) {
  const url = `${apiUrlSearch}?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=12`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.data)
    .catch(error => {
      console.error('Error fetching searched GIFs:', error);
      return [];
    });
}

function displayGIFs(gifs, containerId) {
  const gifContainer = document.getElementById(containerId);
  gifContainer.innerHTML = '';

  gifs.forEach(gif => {
    const gifItem = document.createElement('div');
    gifItem.classList.add('gif-item');
    const img = document.createElement('img');
    img.src = gif.images.fixed_height.url;
    img.alt = gif.title;
    gifItem.appendChild(img);
    gifContainer.appendChild(gifItem);
  });
}

function loadTrendingGIFs() {
  fetchTrendingGIFs()
    .then(gifs => displayGIFs(gifs, 'trendingGifContainer'));
}

function searchGIFs() {
  const searchTerm = document.getElementById('searchInput').value;
  fetchSearchedGIFs(searchTerm)
    .then(gifs => displayGIFs(gifs, 'searchedGifContainer'));
}

// Cargar los GIFs destacados al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  loadTrendingGIFs();
});

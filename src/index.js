
import './scss/style.scss';
import searchImg from './img/search.png';

const API_MOVIE_KEY = "bf6f1eff";
const API_MOVIE_URL = "https://www.omdbapi.com/";

const API_PHOTOS_ACCESS_KEY = `Td3FgsDZfdQKgyViV4UXbgfEIiweZhIUsUlo5ZEtQDQ`;
const API_PHOTOS_URL = `https://api.unsplash.com/search/photos?client_id=${API_PHOTOS_ACCESS_KEY}&per_page=1&orientation=${screen.orientation.type.split("-")[0]}&query=`;

const fetchMovie = async (movie) => {
    const query = `?apikey=${API_MOVIE_KEY}&t=${encodeURIComponent(movie)}`;

    const response = await fetch(API_MOVIE_URL + query);
    const data = await response.json();

    if (data.Response === "True") {
        return data;
    } else {
        console.error(data.Error);
        if (data.Error === "Invalid API key!") {
            alert("Неправильний ключ API");
        } else if (data.Error === "Movie not found!") {
            alert("Фільм не знайдено!");
        } else {
            alert("Щось пішло не так, спробуйте ще раз");
        }
    }
};

const fetchPhoto = async (movieName) => {

    const response = await fetch(API_PHOTOS_URL + movieName);
    const data = await response.json();

    document.body.style.backgroundImage = `url(${data?.results?.[0].urls.full})`;
};

const renderMovie = (movieData, containerSelector) => {
    const container = document.querySelector(containerSelector);
    container.innerHTML = "";


    container.appendChild(
        createMovieElement(
            "h2",
            `Movie: ${movieData.Title}`,
            "movie-title",
        ),
    );

    const poster = document.createElement("img");
    poster.src = movieData.Poster;
    poster.alt = movieData.Title;
    container.appendChild(poster);


    container.appendChild(
        createMovieElement(
            "p",
            `Year: ${movieData.Year}`,
            "movie-year",
        ),
    );
    container.appendChild(
        createMovieElement(
            "p",
            `Type: ${movieData.Type}`,
            "movie-type",
        ),
    );
}

const createMovieElement = (tagName, value, classes) => {
    const elem = document.createElement(tagName);
    elem.innerText = value;
    elem.className = classes;

    return elem;
}

const input = document.forms.movieForm.movie;
let timeoutId;

input.addEventListener("input", function () {
    clearTimeout(timeoutId);
    const value = this.value.trim();

    if (value.length >= 3) {
        timeoutId = setTimeout(async () => {
            const movieData = await fetchMovie(value);
            if (movieData) {
                renderMovie(movieData, "#movie");
                fetchPhoto(value);
            }
        }, 1000);
    }
});

document.forms.movieForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const movie = this.movie.value;


    renderMovie(await fetchMovie(movie), "#movie");
    console.log(await fetchPhoto(movie));
    console.log(await fetchMovie(movie));
});
fetchPhoto();

const img = document.querySelector('img');
img.src = searchImg;





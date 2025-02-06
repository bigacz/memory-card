import genres from 'data/genres.json';
import difficulties from 'data/difficulties.json';

async function fetchMoviesData(genre) {
  const genreId = getGenreId(genre);

  const requestOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYWEzNDkzOTRmNWEyZmM0NGU0OTAyNTM0ODNmM2ZjZiIsIm5iZiI6MTczNzc1MjQ2Ni44NjksInN1YiI6IjY3OTNmZjkyMjVkMjk4MGZiMDIzYTkwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4KXy0MbQVbsnSqjbNtrv3c0BKVaBsEUVmKSLRsEWkhI',
    },
  };

  const requestUrlOptions = [
    'include_adult=false',
    'include_video=false',
    'language=en-US',
    'page=1',
    'sort_by=vote_average.desc',
    'vote_count.gte=500',
    `with_genres=${genreId}`,
  ].join('&');

  const requestUrl = `https://api.themoviedb.org/3/discover/movie?${requestUrlOptions}`;

  try {
    const response = await fetch(requestUrl, requestOptions);
    if (response.ok == true) {
      const data = await response.json();

      return data;
    } else {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    console.error(error);

    return null;
  }
}

function getDifficultyQuantity(searchedDifficultyName) {
  searchedDifficultyName = searchedDifficultyName.toLowerCase();

  const foundDifficulty = difficulties.find((difficulty) => {
    return difficulty.name == searchedDifficultyName;
  });

  return foundDifficulty?.quantity;
}

function generateValueArray(quantity, value) {
  const valueArray = [];
  for (let i = 0; i < quantity; i++) {
    valueArray.push(value);
  }

  return valueArray;
}

function countValuesInArray(array, value) {
  return array.reduce((accumulator, item) => {
    const isSame = item === value;

    const newAccumulator = isSame ? accumulator + 1 : accumulator;

    return newAccumulator;
  }, 0);
}

export {
  fetchMoviesData,
  getDifficultyQuantity,
  generateValueArray,
  countValuesInArray,
};

function getGenreId(searchedGenreName) {
  searchedGenreName = searchedGenreName.toLowerCase();

  const foundGenre = genres.find((genre) => {
    const genreName = genre.name.toLowerCase();

    return genreName == searchedGenreName;
  });

  return foundGenre?.id;
}

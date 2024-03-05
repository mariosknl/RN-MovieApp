export const fetchTopRatedMovies = async () => {
	const url =
		"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2I4MzlkNzdhNmI1MzZjYWU3YzlmOTRkNDI2NGU4NiIsInN1YiI6IjYxYWZhNGRlZTI2M2JiMDA5MWRkMjYyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OjqLyPwrPtd-WxGrOwDNkxV-9dF4irCfrZoF0WDUwbc",
		},
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		throw new Error("Failed to fetch top rated movies");
	}

	const json = await res.json();
	return json.results;
};

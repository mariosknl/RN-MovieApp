export const fetchWatchList = async () => {
	const url =
		"https://api.themoviedb.org/3/account/11546205/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc";
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
		throw new Error("Failed to details for the selected movie");
	}

	const json = await res.json();
	return json.results;
};

export const addMovieToWatchList = async (movieId: number) => {
	const url = "https://api.themoviedb.org/3/account/11546205/watchlist";
	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2I4MzlkNzdhNmI1MzZjYWU3YzlmOTRkNDI2NGU4NiIsInN1YiI6IjYxYWZhNGRlZTI2M2JiMDA5MWRkMjYyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OjqLyPwrPtd-WxGrOwDNkxV-9dF4irCfrZoF0WDUwbc",
		},
		body: JSON.stringify({
			media_type: "movie",
			media_id: movieId,
			watchlist: true,
		}),
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		throw new Error("Failed to details for the selected movie");
	}

	const json = await res.json();
	return json;
};

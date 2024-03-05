import { fetchMovie } from "@/api/movies";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, Text, View } from "react-native";

const MovieDetails = () => {
	const { id } = useLocalSearchParams();

	const {
		data: movie,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["movie", id],
		queryFn: () => fetchMovie(+id),
	});

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>{error.message}</Text>;
	}

	return (
		<View>
			<Stack.Screen options={{ title: movie?.title }} />
			<Image
				source={{
					uri: "https://image.tmdb.org/t/p/w500" + movie.backdrop_path,
				}}
				style={{ width: "100%", height: 300 }}
			/>
			<View style={{ padding: 10 }}>
				<Text style={{ fontSize: 30, fontWeight: "500", marginVertical: 10 }}>
					{movie?.title}
				</Text>
				<Text style={{ fontSize: 16 }}>{movie?.overview}</Text>
			</View>
		</View>
	);
};
export default MovieDetails;

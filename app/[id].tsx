import { fetchMovie } from "@/api/movies";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

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
			<Text style={{ fontSize: 24, fontWeight: "500" }}>{movie?.title}</Text>
		</View>
	);
};
export default MovieDetails;

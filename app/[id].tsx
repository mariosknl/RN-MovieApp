import { fetchMovie } from "@/api/movies";
import { addMovieToWatchList } from "@/api/watchlist";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

const MovieDetails = () => {
	const { id } = useLocalSearchParams();
	const client = useQueryClient();

	const {
		data: movie,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["movie", id],
		queryFn: () => fetchMovie(+id),
	});

	const { mutate } = useMutation({
		mutationFn: () => addMovieToWatchList(+id),
		onSuccess: () => {
			client.invalidateQueries({
				queryKey: ["watchlist"],
			});
		},
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
				<View style={{ marginVertical: 10 }}>
					<Pressable
						onPress={() => mutate()}
						style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
					>
						<FontAwesome name="bookmark-o" size={24} color="black" />
						<Text>Add to watchlist</Text>
					</Pressable>
				</View>
				<Text style={{ fontSize: 16 }}>{movie?.overview}</Text>
			</View>
		</View>
	);
};
export default MovieDetails;

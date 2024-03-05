import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";

import { View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { fetchTopRatedMovies } from "@/api/movies";

import { useQuery } from "@tanstack/react-query";

export default function TabOneScreen() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["movies"],
		queryFn: fetchTopRatedMovies,
	});

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>{error.message}</Text>;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<View>
						<Text>{item.title}</Text>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

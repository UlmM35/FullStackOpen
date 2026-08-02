import { View, Text } from "react-native";

const RepositoryItem = ({ item }) => {
         return (
            <View>
                <Text>Full name: {item.id}</Text>
                <Text>Description: {item.fullName}</Text>
                <Text>Language: {item.description}</Text>
                <Text>Stars: {item.language}</Text>
                <Text>Forks: {item.forksCount}</Text>
                <Text>Reviews: {item.ratingAverage}</Text>
                <Text>Rating: {item.reviewCount}</Text>
            </View>
  );
}

export default RepositoryItem;
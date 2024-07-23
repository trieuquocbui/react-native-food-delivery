import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, TextInput, View } from "react-native";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { Colors } from "@/constants/Colors";

const SearchBar: React.FC = () => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        <FontAwesomeIcon icon={faSearch} size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    alignItems: "center",
    width: 300,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: Colors.whiteColor,
    borderRadius: 25,
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
    color: "#000000",
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;

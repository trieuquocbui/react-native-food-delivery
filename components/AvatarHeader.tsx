import { Image, StyleSheet, TouchableOpacity } from "react-native";
interface AvatarHeaderProps {
  onPress?: () => void;
}

const AvatarHeader: React.FC<AvatarHeaderProps> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.image}
        source={require("../assets/images/th.jpg")}
      ></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default AvatarHeader;

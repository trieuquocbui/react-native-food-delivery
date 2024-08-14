import { Colors } from "@/constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import socket from "@/sockets/EmployeeSocket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={require("@/assets/images/th.jpg")}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value="Bùi Quốc Triệu"
              editable={false}
            />
            <Pressable>
              <FontAwesomeIcon
                color={Colors.primaryBackground}
                size={15}
                icon={faPenToSquare}
              />
            </Pressable>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value="0869070142"
              editable={false}
            />
            <Pressable>
              <FontAwesomeIcon
                color={Colors.primaryBackground}
                size={15}
                icon={faPenToSquare}
              />
            </Pressable>
          </View>
          <Pressable style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
          </Pressable>
        </View>
        <View style={styles.logoutContainer}>
          <Pressable
            style={styles.logoutButton}
            onPress={() => {
              socket.disconnect();
              AsyncStorage.clear(), router.push("/");
            }}
          >
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    padding: 16,
  },
  profileSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    paddingBottom: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  saveButton: {
    backgroundColor: Colors.primaryBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 16,
  },
  saveButtonText: {
    color: Colors.whiteColor,
    fontSize: 16,
  },
  logoutContainer: {
    marginTop: 32,
  },
  logoutButton: {
    backgroundColor: Colors.redColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: Colors.whiteColor,
    fontSize: 16,
  },
});

export default ProfileScreen;

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
import {
  AccountState,
  editProfile,
  setFullName,
  setPhoneNumber,
} from "@/stores/AccountSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/stores/Store";
import RegisterModel from "@/models/RegisterModel";
import { useState } from "react";

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [allowEditFullname, setAllowEditFullname] = useState(false);
  const [allowEditPhoneNumber, setAllowEditPhoneNumber] = useState(false);

  const accountState: AccountState = useAppSelector(
    (state: RootState) => state.account
  );

  const handleChange = (name: keyof RegisterModel, value: string) => {
    if (name == "fullName") {
      dispatch(setFullName(value));
    } else if (name == "phoneNumber") {
      dispatch(setPhoneNumber(value));
    }
  };

  const onclickEdit = (type: string) => {
    if (type == "fullName") {
      setAllowEditFullname((prev) => !prev);
    } else {
      setAllowEditPhoneNumber((prev) => !prev);
    }
  };

  const validate = () => {
    const error: { fullName: string; phoneNumber: string } = {
      fullName: accountState.account.user.fullName ? "" : "Trường này cần nhập",
      phoneNumber: accountState.account.user.phoneNumber
        ? ""
        : "Trường này cần nhập",
    };
    return !error.fullName && !error.phoneNumber;
  };

  const handleSubmit = async () => {
    if (validate()) {
      dispatch(
        editProfile({
          fullName: accountState.account.user.fullName,
          phoneNumber: accountState.account.user.phoneNumber,
        })
      );
    }
  };

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
              value={accountState.account.user.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
              editable={allowEditFullname}
            />
            <Pressable onPress={() => onclickEdit("fullName")}>
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
              value={accountState.account.user.phoneNumber}
              onChangeText={(text) => handleChange("phoneNumber", text)}
              editable={allowEditPhoneNumber}
            />
            <Pressable onPress={() => onclickEdit("phoneNumber")}>
              <FontAwesomeIcon
                color={Colors.primaryBackground}
                size={15}
                icon={faPenToSquare}
              />
            </Pressable>
          </View>
          <Pressable style={styles.saveButton} onPress={handleSubmit}>
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

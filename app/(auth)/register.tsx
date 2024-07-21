import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import RegisterModel from "@/models/RegisterModel";
import {
  registerAsync,
  RegisterState,
  setConfirmPassword,
  setError,
  setFullName,
  setPassword,
  setPhoneNumber,
  setUsername,
} from "@/stores/RegisterSlice";
import { RootState } from "@/stores/Store";
import { Link } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

const RegisterScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const registerState: RegisterState = useAppSelector(
    (state: RootState) => state.register
  );

  const handleChange = (name: keyof RegisterModel, value: string) => {
    if (name == "username") {
      dispatch(setUsername(value));
    } else if (name == "password") {
      dispatch(setPassword(value));
    } else if (name == "confirmPassword") {
      dispatch(setConfirmPassword(value));
    } else if (name == "fullName") {
      dispatch(setFullName(value));
    } else if (name == "phoneNumber") {
      dispatch(setPhoneNumber(value));
    }
  };

  const validate = () => {
    const error: RegisterModel = {
      username: registerState.register.username ? "" : "Trường này cần nhập",
      password: registerState.register.password ? "" : "Trường này cần nhập",
      confirmPassword: registerState.register.confirmPassword
        ? registerState.register.password &&
          registerState.register.confirmPassword ==
            registerState.register.password
          ? ""
          : "Xác thực mật khẩu thất bại"
        : "Trường này cần nhập",
      fullName: registerState.register.fullName ? "" : "Trường này cần nhập",
      phoneNumber: registerState.register.phoneNumber
        ? ""
        : "Trường này cần nhập",
    };
    dispatch(setError(error));
    return (
      !error.username &&
      !error.password &&
      !error.confirmPassword &&
      !error.fullName &&
      !error.phoneNumber
    );
  };

  const handleSubmit = async () => {
    if (validate()) {
      dispatch(registerAsync(registerState.register));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Đăng kí</Text>
      </View>
      <View style={styles.infor}>
        <View style={styles.inforContainer}>
          <Text style={styles.inforLabel}>Tên tài khoản</Text>
          <TextInput
            style={styles.inforInput}
            placeholder="Nhập tài khoản"
            value={registerState.register.username}
            onChangeText={(text) => handleChange("username", text)}
          ></TextInput>
          {registerState.error.username ? (
            <Text style={styles.inforError}>
              {registerState.error.username}
            </Text>
          ) : (
            <Text style={styles.inforError}></Text>
          )}
        </View>
        <View>
          <Text style={styles.inforLabel}>Mật khẩu</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inforInput}
            placeholder="Nhập mật khẩu"
            value={registerState.register.password}
            onChangeText={(text) => handleChange("password", text)}
          ></TextInput>
          {registerState.error.password ? (
            <Text style={styles.inforError}>
              {registerState.error.password}
            </Text>
          ) : (
            <Text style={styles.inforError}></Text>
          )}
        </View>
        <View>
          <Text style={styles.inforLabel}>Xác thực mật khẩu</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inforInput}
            placeholder="Xác thực mật khẩu"
            value={registerState.register.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
          ></TextInput>
          {registerState.error.confirmPassword ? (
            <Text style={styles.inforError}>
              {registerState.error.confirmPassword}
            </Text>
          ) : (
            <Text style={styles.inforError}></Text>
          )}
        </View>
        <View>
          <Text style={styles.inforLabel}>Số điện thoại</Text>
          <TextInput
            style={styles.inforInput}
            placeholder="Nhập số điện thoại"
            value={registerState.register.phoneNumber}
            onChangeText={(text) => handleChange("phoneNumber", text)}
          ></TextInput>
          {registerState.error.phoneNumber ? (
            <Text style={styles.inforError}>
              {registerState.error.phoneNumber}
            </Text>
          ) : (
            <Text style={styles.inforError}></Text>
          )}
        </View>
        <View>
          <Text style={styles.inforLabel}>Họ và tên</Text>
          <TextInput
            style={styles.inforInput}
            placeholder="Nhập họ và tên"
            value={registerState.register.fullName}
            onChangeText={(text) => handleChange("fullName", text)}
          ></TextInput>
          {registerState.error.fullName ? (
            <Text style={styles.inforError}>
              {registerState.error.fullName}
            </Text>
          ) : (
            <Text style={styles.inforError}></Text>
          )}
        </View>
        <View style={styles.mt10}>
          <CustomButton onPress={handleSubmit} title="Đăng nhập"></CustomButton>
        </View>
        <View style={[styles.linkContainer, styles.mt10]}>
          <Text style={styles.textlink}>
            Bạn đã có tài khoản?{" "}
            <Link style={styles.link} href="/(auth)/login">
              Đăng nhập
            </Link>
          </Text>
        </View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mt10: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  title: {
    marginTop: 50,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: Colors.whiteColor,
    fontSize: 30,
  },
  infor: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.whiteBackground,
  },
  inforContainer: {},
  inforLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inforInput: {
    backgroundColor: "#F4F4F4",
    padding: 10,
    borderRadius: 20,
  },
  inforError: {
    fontSize: 14,
    color: Colors.redColor,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inforRemenberPassword: {
    flexDirection: "row",
    alignItems: "center",
  },
  inforCheckbox: {
    borderRadius: 10,
    height: 16,
    width: 16,
  },
  inforRemenber: {
    marginLeft: 2,
    fontSize: 16,
  },
  inforMissPassword: {
    color: Colors.primaryBackground,
    fontSize: 16,
  },
  linkContainer: {
    alignItems: "center",
  },
  textlink: {
    fontSize: 16,
  },
  link: {
    color: Colors.primaryBackground,
    fontSize: 16,
  },
  orTextContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: "#F4F4F4",
    borderRadius: 50,
    width: 82,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.primaryBackground,
    fontSize: 16,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#EBE3E3",
    position: "absolute",
    top: "50%",
    left: 0,
  },
});

export default RegisterScreen;

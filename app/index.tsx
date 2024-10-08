import CustomButton from "@/components/CustomButton";
import CustomSocialButton from "@/components/CustomSocialButton";
import { Colors } from "@/constants/Colors";
import LoginModel from "@/models/LoginModel";
import Checkbox from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { RootState } from "@/stores/Store";
import {
  loginAsync,
  LoginState,
  setError,
  setPassword,
  setUsername,
} from "@/stores/LoginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRole } from "@/helpers/DecodeHelper";
import RoleHelper from "@/helpers/RoleHelper";

const LoginScreen: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const loginState: LoginState = useAppSelector(
    (state: RootState) => state.login
  );

  const handleChange = (name: keyof LoginModel, value: string) => {
    if (name == "username") {
      dispatch(setUsername(value));
    } else if (name == "password") {
      dispatch(setPassword(value));
    }
  };

  const validate = () => {
    const errors: LoginModel = {
      username: loginState.login.username ? "" : "Trường này cần nhập",
      password: loginState.login.password ? "" : "Trường này cần nhập",
    };
    dispatch(setError(errors));
    return !errors.username && !errors.password;
  };

  const handleSubmit = async () => {
    if (validate()) {
      await dispatch(loginAsync(loginState.login));
      let token: string | null = await AsyncStorage.getItem("token");
      let role: string = getRole(token!);
      if (role == RoleHelper.USER) {
        router.push("/customer");
      } else if (role == RoleHelper.EMPLOYEE) {
        router.push("/employee");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Đăng nhập</Text>
      </View>
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={require("../assets/images/react-logo.png")}
        ></Image>
      </View>
      <View style={styles.infor}>
        <View style={styles.inforContainer}>
          <Text style={styles.inforLabel}>Tên tài khoản</Text>
          <TextInput
            style={styles.inforInput}
            placeholder="Nhập tài khoản"
            value={loginState.login.username}
            onChangeText={(text) => handleChange("username", text)}
          ></TextInput>
          {loginState.error.username ? (
            <Text style={styles.inforError}>{loginState.error.username}</Text>
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
            value={loginState.login.password}
            onChangeText={(text) => handleChange("password", text)}
          ></TextInput>
          {loginState.error.password ? (
            <Text style={styles.inforError}>{loginState.error.password}</Text>
          ) : (
            <Text style={styles.inforError}></Text>
          )}
        </View>
        <View style={[styles.passwordContainer, styles.mt10]}>
          <View style={styles.inforRemenberPassword}>
            <Checkbox style={styles.inforCheckbox}></Checkbox>
            <Text style={styles.inforRemenber}>Nhớ mật khẩu</Text>
          </View>
          <View>
            <Link href="" style={styles.inforMissPassword}>
              Quên mật khẩu?
            </Link>
          </View>
        </View>
        <View style={styles.mt10}>
          <CustomButton onPress={handleSubmit} title="Đăng nhập"></CustomButton>
        </View>
        <View style={[styles.linkContainer, styles.mt10]}>
          <Text style={styles.textlink}>
            Bạn có tài khoản chưa?{" "}
            <Link style={styles.link} href="/register">
              Đăng kí
            </Link>
          </Text>
        </View>
        <View style={styles.orTextContainer}>
          <View style={styles.line} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Hoặc</Text>
          </View>
        </View>
        <View>
          <View>
            <CustomSocialButton
              onPress={() => null}
              title="Đăng nhập với Google"
              imagePath={require("../assets/images/GG.jpg")}
            ></CustomSocialButton>
          </View>
          <View style={styles.mt10}>
            <CustomSocialButton
              onPress={() => null}
              title="Đăng nhập với FaceBook"
              imagePath={require("../assets/images/FB.jpg")}
            ></CustomSocialButton>
          </View>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: Colors.whiteColor,
    fontSize: 30,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 32,
    borderRadius: 50,
  },
  logoImage: {
    width: 130,
    height: 130,
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

export default LoginScreen;

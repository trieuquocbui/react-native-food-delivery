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
    <View>
      <Text>employee</Text>
    </View>
  );
};

export default RegisterScreen;

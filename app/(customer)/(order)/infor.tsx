import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/stores/Store";
import {
  ErrorModel,
  OrderState,
  setAddress1,
  setAddress2,
  setCheckInforUser,
  setError,
  setFullName,
  setPhoneNumber,
} from "@/stores/OrderSlice";
import OrderModel from "@/models/OrderModel";
const RegisterScreen: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const orderState: OrderState = useAppSelector(
    (state: RootState) => state.order
  );

  const handleChange = (name: keyof OrderModel, value: string) => {
    if (name == "fullName") {
      dispatch(setFullName(value));
    } else if (name == "phoneNumber") {
      dispatch(setPhoneNumber(value));
    } else if (name == "address1") {
      dispatch(setAddress1(value));
    } else if (name == "address2") {
      dispatch(setAddress2(value));
    }
  };

  const validate = () => {
    const error: ErrorModel = {
      fullName: orderState.newOrder.fullName ? "" : "Trường này cần nhập",
      phoneNumber: orderState.newOrder.phoneNumber ? "" : "Trường này cần nhập",
      address1: orderState.newOrder.address1 ? "" : "Trường này cần nhập",
      address2: orderState.newOrder.address2 ? "" : "Trường này cần chọn",
    };
    dispatch(setError(error));
    return (
      !error.fullName &&
      !error.phoneNumber &&
      !error.address1 &&
      !error.address2
    );
  };

  const handleSubmit = async () => {
    if (validate()) {
      dispatch(setCheckInforUser(true));
      router.back();
    } else {
      dispatch(setCheckInforUser(false));
    }
  };

  return (
    <View style={styles.inforUser}>
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.inforInput}
            placeholder="Họ và tên"
            value={orderState.newOrder.fullName}
            onChangeText={(text) => handleChange("fullName", text)}
          ></TextInput>
          {orderState.error.fullName ? (
            <Text style={styles.inforError}>{orderState.error.fullName}</Text>
          ) : (
            <Text style={styles.inforError}></Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.inforInput}
            placeholder="Số điện thoại"
            value={orderState.newOrder.phoneNumber}
            onChangeText={(text) => handleChange("phoneNumber", text)}
          ></TextInput>
          {orderState.error.phoneNumber ? (
            <Text style={styles.inforError}>
              {orderState.error.phoneNumber}
            </Text>
          ) : (
            <Text style={styles.inforError}></Text>
          )}
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Pressable
            style={styles.address}
            onPress={() => router.push("/location")}
          >
            <Text style={styles.text}>
              {orderState.newOrder.address2
                ? orderState.newOrder.address2
                : " Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"}
            </Text>
            <FontAwesomeIcon
              size={16}
              icon={faChevronRight}
              color={Colors.primaryBackground}
            />
          </Pressable>
          {orderState.error.address2 ? (
            <Text style={styles.inforError}>{orderState.error.address2}</Text>
          ) : (
            <Text style={styles.inforError}></Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.inforInput}
            placeholder="Số nhà"
            value={orderState.newOrder.address1}
            onChangeText={(text) => handleChange("address1", text)}
          ></TextInput>
          {orderState.error.address1 ? (
            <Text style={styles.inforError}>{orderState.error.address1}</Text>
          ) : (
            <Text style={styles.inforError}></Text>
          )}
        </View>
      </View>
      <View style={styles.mt10}>
        <CustomButton onPress={handleSubmit} title="Hoàn tất"></CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mt10: {
    marginTop: 10,
  },
  address: {
    backgroundColor: "#F4F4F4",
    paddingLeft: 10,
    borderRadius: 20,
    paddingVertical: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 6,
  },
  text: {
    flex: 1,
  },
  inforUser: {
    padding: 10,
    flex: 1,
    backgroundColor: Colors.whiteBackground,
  },
  container: {},
  inforInput: {
    backgroundColor: "#F4F4F4",
    paddingVertical: 6,
    paddingLeft: 10,
    borderRadius: 20,
  },
  inforError: {
    fontSize: 12,
    color: Colors.redColor,
  },
});

export default RegisterScreen;

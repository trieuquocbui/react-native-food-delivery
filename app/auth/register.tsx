import CustomButton from "@/components/CustomButton";
import CustomSocialButton from "@/components/CustomSocialButton";
import { Colors } from "@/constants/Colors";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Đăng kí</Text>
      </View>
      
      <View style={styles.infor}>
        <View style={styles.inforContainer}>
          <Text style={styles.inforLabel}>Tên tài khoản</Text>
          <TextInput style={styles.inforInput} placeholder="Nhập tài khoản"></TextInput>
          <Text style={styles.inforError}>vui lòng nhập tài khoản</Text>
        </View>
        <View>
          <Text style={styles.inforLabel}>Mật khẩu</Text>
          <TextInput secureTextEntry={true} style={styles.inforInput} placeholder="Nhập mật khẩu" ></TextInput>
          <Text style={styles.inforError}>vui lòng nhập mật khẩu</Text>
        </View>
        <View>
          <Text style={styles.inforLabel}>Xác thực mật khẩu</Text>
          <TextInput secureTextEntry={true} style={styles.inforInput} placeholder="Xác thực mật khẩu" ></TextInput>
          <Text style={styles.inforError}>Vui lòng xác thực mật khẩu</Text>
        </View>
        <View>
          <Text style={styles.inforLabel}>Số điện thoại</Text>
          <TextInput secureTextEntry={true} style={styles.inforInput} placeholder="Nhập số điện thoại" ></TextInput>
          <Text style={styles.inforError}>Vui lòng nhập số điện thoại</Text>
        </View>
        <View>
          <Text style={styles.inforLabel}>Họ và tên</Text>
          <TextInput secureTextEntry={true} style={styles.inforInput} placeholder="Nhập họ và tên" ></TextInput>
          <Text style={styles.inforError}>Vui lòng nhập họ và tên</Text>
        </View>
        <View style={styles.mt10 }>
          <CustomButton  onPress={() => null} title="Đăng nhập"></CustomButton>
        </View>
        <View style={[styles.linkContainer, styles.mt10]}>
          <Text style={styles.textlink}>Bạn đã có tài khoản? <Link style={styles.link} href="/auth/login">Đăng nhập</Link></Text>
        </View>
        <View>
        </View>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  mt10:{
    marginTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground
  },
  title:{
    marginTop:50,
    marginBottom:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText:{
    color: Colors.whiteColor,
    fontSize: 30,
  },
  infor:{
    flex: 1,
    padding: 20,
    borderTopLeftRadius : 30, 
    borderTopRightRadius : 30, 
    backgroundColor: Colors.whiteBackground
  },
  inforContainer:{

  },
  inforLabel:{
    fontSize:20,
    fontWeight: 'bold'
  },
  inforInput:{
    backgroundColor:'#F4F4F4',
    padding: 10,
    borderRadius: 20
  },
  inforError:{
    fontSize:14,
    color: Colors.redColor
  },
  passwordContainer:{
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'
  },
  inforRemenberPassword:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  inforCheckbox:{
    borderRadius: 10,
    height: 16,
    width: 16
  },
  inforRemenber:{
    marginLeft: 2,
    fontSize: 16
  },
  inforMissPassword:{
    color: Colors.primaryBackground,
    fontSize: 16
  },
  linkContainer:{
    alignItems:'center'
  },
  textlink:{
    fontSize: 16
  },
  link:{
    color: Colors.primaryBackground,
    fontSize: 16,
  },
  orTextContainer:{
    marginVertical: 10,
    alignItems: 'center'
  },
  textContainer:{
    backgroundColor: '#F4F4F4',
    borderRadius: 50,
    width: 82,
    height: 30,
    alignItems: 'center',
    justifyContent:'center'
    
  },
  text:{
    color: Colors.primaryBackground,
    fontSize: 16
  },
  line:{
    width: '100%',
    height: 1,
    backgroundColor: '#EBE3E3',
    position: 'absolute', 
    top: '50%',
    left: 0,
  }
})

export default RegisterScreen
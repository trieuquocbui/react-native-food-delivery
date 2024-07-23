import CustomButton from "@/components/CustomButton";
import ProductItem from "@/components/ProductItem";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const data = [
  { id: "1", name: "a" },
  { id: "2", name: "a" },
  { id: "3", name: "a" },
  { id: "4", name: "a" },
  { id: "5", name: "a" },
  { id: "6", name: "a" },
];

const ProductDetailsScreen: React.FC = () => {
  const { productId } = useLocalSearchParams();

  return (
    <View style={styles.details}>
      <View style={styles.detailsContainer}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.container}>
              <View style={styles.logo}>
                <Image
                  style={styles.logoImage}
                  source={require("../../../assets/images/th.jpg")}
                ></Image>
              </View>
              <View style={styles.body}>
                <View style={styles.productDetail}>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.price, styles.textWhite]}>45000</Text>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={1}>
                      Hủ tiếu khô nam vang
                    </Text>
                  </View>
                  <View style={styles.productionContainer}>
                    <View style={styles.row}>
                      <Text>Số lượng: </Text>
                      <Text style={styles.primaryColor}>100</Text>
                    </View>
                    <View style={styles.row}>
                      <Text>Đã bán: </Text>
                      <Text style={styles.primaryColor}>100</Text>
                    </View>
                  </View>
                  <View>
                    <Text numberOfLines={5}>
                      Bài viết giới thiệu sản phẩm là bài viết chứa thông tin mô
                      tả của sản phẩm. Sao cho người đọc hiểu hết được sản phẩm
                      đó là gì, có công dụng ra sao, sử dụng như thế nào. đó là
                      gì, có công dụng ra sao, sử dụng như thế nào.
                    </Text>
                  </View>
                  <Text style={styles.name} numberOfLines={1}>
                    Các sản phẩm liên quan
                  </Text>
                </View>
              </View>
            </View>
          }
          data={data}
          renderItem={(item) => <ProductItem></ProductItem>}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.rowList}
        ></FlatList>
      </View>

      <View style={styles.btnAddContainer}>
        <CustomButton
          onPress={() => null}
          title="Thêm vào giỏ hàng"
        ></CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowList: {
    justifyContent: "space-between",
    marginBottom: 8,
  },
  details: { flex: 1 },
  detailsContainer: {
    height: "94%",
  },
  btnAddContainer: {
    height: "16%",
  },

  primaryColor: {
    color: Colors.primaryBackground,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  textWhite: {
    color: Colors.whiteColor,
  },
  price: {
    fontSize: 16,
  },
  mt10: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 32,
    borderRadius: 50,
  },
  logoImage: {
    width: 280,
    height: 280,
    borderRadius: 160,
  },
  body: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.whiteBackground,
  },
  productDetail: {},
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  priceContainer: {
    alignSelf: "flex-start",
    justifyContent: "center",
    height: 40,
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  productionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameContainer: {
    marginVertical: 2,
  },
});

export default ProductDetailsScreen;

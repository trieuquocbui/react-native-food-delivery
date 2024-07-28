import AutoHideModal from "@/components/AutoHideModal";
import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { imageUrl } from "@/helpers/BaseUrlHelper";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { createCartDetailsAsync } from "@/stores/CartDetailsSlice";
import { getDetailAsync, ProductState } from "@/stores/ProductSlice";
import { RootState } from "@/stores/Store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Alert } from "react-native";

const data = [
  { id: "1", name: "a" },
  { id: "2", name: "a" },
  { id: "3", name: "a" },
  { id: "4", name: "a" },
  { id: "5", name: "a" },
  { id: "6", name: "a" },
];

const ProductDetailsScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const productState: ProductState = useAppSelector(
    (state: RootState) => state.product
  );

  const [alertVisible, setAlertVisible] = useState(false);

  const { productId } = useLocalSearchParams();

  const onClickAdditionBtn = async () => {
    if (typeof productId === "string") {
      dispatch(createCartDetailsAsync(productId));
    }
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    if (typeof productId === "string") {
      dispatch(getDetailAsync(productId));
    }
  }, [dispatch, productId]);

  return (
    <View style={styles.details}>
      <View style={styles.detailsContainer}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.container}>
              <View>
                <Image
                  style={styles.logoImage}
                  source={{ uri: imageUrl + productState.detail.thumbnail }}
                ></Image>
              </View>
              <View style={styles.body}>
                <View style={styles.productDetail}>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.price, styles.textWhite]}>
                      {productState.detail.price}
                    </Text>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={1}>
                      {productState.detail.name}
                    </Text>
                  </View>
                  <View style={styles.productionContainer}>
                    <View style={styles.row}>
                      <Text>Số lượng: </Text>
                      <Text style={styles.primaryColor}>
                        {productState.detail.quantity}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text>Đã bán: </Text>
                      <Text style={styles.primaryColor}>
                        {productState.detail.sold}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text numberOfLines={5}>
                      {productState.detail.description}
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
          renderItem={() => <View></View>}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.rowList}
        ></FlatList>
      </View>
      <View style={styles.btnAddContainer}>
        <CustomButton
          onPress={onClickAdditionBtn}
          title="Thêm vào giỏ hàng"
        ></CustomButton>
      </View>

      <AutoHideModal
        visible={alertVisible}
        onClose={hideAlert}
        message="Thêm thành công"
      />
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
    height: "93%",
  },
  btnAddContainer: {
    flex: 1,
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
    borderRadius: 50,
  },
  logoImage: {
    width: "100%",
    height: 280,
  },
  body: {
    flex: 1,
    padding: 20,
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

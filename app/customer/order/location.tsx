import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { setAddress2, setLatitude, setLongitude } from "@/stores/OrderSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Colors } from "@/constants/Colors";

const LocationScreen: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Thiết bị không cho phép truy cập");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const goBack = async () => {
    if (location) {
      let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
      if (reverseGeocode.length > 0) {
        const address = `${reverseGeocode[0].street}, ${reverseGeocode[0].city}, ${reverseGeocode[0].region}, ${reverseGeocode[0].country}`;
        dispatch(setAddress2(address));
        dispatch(setLatitude(location.coords.latitude));
        dispatch(setLongitude(location.coords.longitude));
      }
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
            >
              <Marker coordinate={location.coords} />
            </MapView>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={goBack}>
              <Text style={styles.textColor}>Lấy vị trí</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.mapContainer}>
            <MapView style={styles.map} showsUserLocation={true}></MapView>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={getLocation}>
              <Text style={styles.textColor}>Định vị hiện tại</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    flex: 1,
    width: "100%",
  },
  btnContainer: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBackground,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  textColor: {
    fontSize: 18,
    color: Colors.whiteColor,
  },
});

export default LocationScreen;

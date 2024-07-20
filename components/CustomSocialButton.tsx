import { Colors } from '@/constants/Colors'; 
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface CustomSocialButtonProps {
  onPress: () => void;
  title: string;
  imagePath: ImageSourcePropType; 
}

const CustomSocialButton: React.FC<CustomSocialButtonProps> = ({ onPress, title, imagePath }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <Image source={imagePath} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderColor: '#373030',
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 20,
    backgroundColor: Colors.primaryBackground, 
    padding: 10, 
    justifyContent: 'center', 
  },
  text: {
    color: Colors.whiteColor,
    fontSize: 20,
    marginLeft: 10, 
  },
  image: {
    width: 30, 
    height: 30,
    borderRadius: 50
  },
});

export default CustomSocialButton;

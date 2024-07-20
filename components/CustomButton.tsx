import { Colors } from '@/constants/Colors';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
    padding: 10,
    backgroundColor: Colors.primaryBackground,
    borderRadius: 20,
    alignItems: 'center',
  },
  text:{
    color: Colors.whiteColor,
    fontSize: 20

  }
});

export default CustomButton;
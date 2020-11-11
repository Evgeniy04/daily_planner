import React from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Text
} from 'react-native';

export const AppButton = ({ children, onPress, color = '#000' }) => {
  try {
      return (
        <TouchableNativeFeedback onPress={onPress} activeOpacity={0.7}>
          <View style={{ ...styles.button, backgroundColor: color }}>
            <Text style={styles.text}>{children}</Text>
          </View>
        </TouchableNativeFeedback>
      );
  } catch (error) {
      console.log(error);
      return (
          <View>
              <Text>Ошибка №7: Кнопка не доступна.</Text>
              <Text>{error}</Text>
          </View>
      );
  }
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff'
  }
})

import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Text} from 'react-native';
import { THEME } from '../../THEME';

function getLocalDay(date) {
  try {
      let day = date.getDay();

      switch(day) {
        case 0:
          return 'Воскресенье';
        case 1:
          return 'Понедельник';
        case 2:
          return 'Вторник';
        case 3:
          return 'Среда';
        case 4:
          return 'Четверг';
        case 5:
          return 'Пятница';
        case 6:
          return 'Суббота';
      };
  } catch (error) {
        console.log(error);
        return (
            <View>
                <Text>Ошибка №4: Элемент не загружен.</Text>
                <Text>{error}</Text>
            </View>
        );
  }
}

export const ElementDayAppButton = ({ children, onPress, style = null, styletext = null, amount = 0, type = null}) => {
  try {
      let dt = new Date(); //date
      dt.setDate(dt.getDate() + +amount); //date through...
      return (
        <TouchableNativeFeedback onPress={() => onPress(dt.toLocaleDateString())} activeOpacity={0.8}>
          <View style={{ ...styles.view, ...style}}>
            <View style={styles.date}>
              <Text style={styles.dt}>{dt.toLocaleDateString()}</Text>
            </View>
            <View style={styles.title}>
              <Text style={{...styles.text, ...styletext}}>{type ? getLocalDay(dt) : children}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      );
  } catch (error) {
        console.log(error);
        return (
            <View>
                <Text>Ошибка №5: Элемент не загружен.</Text>
                <Text>{error}</Text>
            </View>
        );
  }
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: THEME.BORDER_COLOR,
    backgroundColor: THEME.BACKGROUND_BORDER_COLOR
  },
  text: {
    fontSize: 20,
  },
  dt: {
    alignItems: "flex-end",
  },
  date: {
    position: 'absolute',
    margin: 5
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
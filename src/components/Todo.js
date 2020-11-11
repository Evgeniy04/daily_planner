import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { DB } from '../db';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { THEME } from '../THEME';

export const Todo = ({ width, todo, date, onOpen }) => {
    try {
      const removeTodo = (todo, date) => {
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить "${todo.title}"?`,
            [
              {
                text: 'Отмена',
                style: 'cancel'
              },
              {
                text: 'Удалить',
                style: 'destructive',
                onPress: () => {
                    DB.removeElements(date, todo.id)
                }
              }
            ],
            { cancelable: false }
        );
      };

      const onChange = (date, id, value) => {
        DB.updateCheck(date, id, value);
      };

      const onCheck = () => {
        if (todo.check) {
            return (
              <View style={{...styles.button, ...styles.true, paddingLeft: width - 150}}>
                <AntDesign.Button backgroundColor={THEME.GREEN_COLOR} onPress= {() => onChange(date, todo.id, 0)} name="checkcircle" size={20} color="black">Выполнено</AntDesign.Button>
              </View>);
        } else {
          return (
            <View style={{...styles.button, ...styles.false, paddingLeft: width - 170}}>
              <Entypo.Button backgroundColor={THEME.DANGER_COLOR} onPress= {() => onChange(date, todo.id, 1)} name="circle-with-cross" size={20} color="black">Не выполнено</Entypo.Button>
            </View>);
        }
      };

      return (
          <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onOpen()}
              onLongPress={() => removeTodo(todo, date)}
          >
          <View style={styles.todo}>
              <View style = {styles.text}>
                <Text>{'• ' + todo.title}</Text>
              </View>
              <View style = {{...styles.button}}>
                {onCheck()}
              </View>
          </View>
          </TouchableOpacity>
      );
    } catch (error) {
      console.log(error);
        return (
            <View>
                <Text>Ошибка №10: Дело не может загрузиться.</Text>
                <Text>{error}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: THEME.BORDER_COLOR,
    backgroundColor: THEME.BACKGROUND_BORDER_COLOR,
    borderRadius: 5,
    margin: 10
  },
  text: {
    padding: 15
  },
  button: {
    position: "absolute",
    justifyContent: "center",
  },
})

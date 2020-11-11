import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { THEME } from '../THEME';

export const AddTodo = ({ onPress }) => {
  try {
    const [value, setValue] = useState('');

    const pressHandler = () => {
      if (value.trim()) {
        onPress(value);
        setValue('');
        Keyboard.dismiss();
      } else {
        Alert.alert('Название дела не может быть пустым');
      }
    };

    return (
      <View style={styles.block}>
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          value={value}
          placeholder='Введите название дела...'
          autoCorrect={false}
          autoCapitalize='none'
        />
        <AntDesign.Button backgroundColor={THEME.BUTTON_COLOR} onPress={pressHandler} name='pluscircleo'>Добавить</AntDesign.Button>
      </View>
    );
  } catch (error) {
        console.log(error);
        return (
            <View>
                <Text>Ошибка №9: Окно ввода не доступно.</Text>
                <Text>{error}</Text>
            </View>
        );
  }
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10
  },
  input: {
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: THEME.BUTTON_COLOR,
    backgroundColor: THEME.BORDER_COLOR,
  }
})

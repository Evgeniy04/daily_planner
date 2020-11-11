import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import { THEME } from '../THEME';
import { AppButton } from './ui/AppButton';

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  try {
      const [title, setTitle] = useState(value);

      const saveHandler = () => {
        if (title.trim().length < 3) {
          Alert.alert(
            'Ошибка!',
            `Минимальная длина названия 3 символа. Сейчас ${
              title.trim().length
            } символов.`
          );
        } else {
            onSave(title);
        }
      };

      const cancelHandler = () => {
        setTitle(value);
        onCancel();
      };

      return (
        <View>
          <Modal visible={visible} animationType='slide' transparent={true} presentationStyle='overFullScreen'>
            <View style={styles.wrap}>
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholder='Введите название'
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={64}
              />
              <View style={styles.buttons}>
                <AppButton color={THEME.BUTTON_COLOR} onPress={cancelHandler}>Отменить</AppButton>
                <AppButton color={THEME.GREEN_COLOR} onPress={saveHandler}>Сохранить</AppButton>
              </View>
            </View>
          </Modal>
        </View>
      );
  } catch (error) {
        console.log(error);
        return (
            <View>
                <Text>Ошибка №8: Модальное окно не загружено.</Text>
                <Text>{error}</Text>
            </View>
        );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.HEADER_TITLE_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

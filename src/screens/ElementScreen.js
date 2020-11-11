import React, { useState, useContext } from 'react';
import { StyleSheet, View, Dimensions, Text, Alert } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { ElementContext } from '../context/ElementContext';
import { DB } from '../db';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';
import { EditModal } from '../components/EditModal';
import { THEME } from '../THEME';

export const ElementScreen = ({route, navigation}) => {
    try {
        const {date, id} = route.params;

        const {todos, fetchTodos} = useContext(ElementContext);
        const [modal, setModal] = useState(false);
        const todo = todos.find(t => t.id === id);
        let todoTitle;
        let todoId;
        if (todo) {
            todoTitle = todo.title ? todo.title:null;
            todoId = todo.id;

            const saveHandler = async title => {
                await DB.updateElement(JSON.stringify(date), JSON.stringify(id), title);
                setModal(false);
            };

            const removeTodo = (todoTitle, date, navigation) => {
                Alert.alert(
                    'Удаление элемента',
                    `Вы уверены, что хотите удалить "${todoTitle}"?`,
                    [
                    {
                        text: 'Отмена',
                        style: 'cancel'
                    },
                    {
                        text: 'Удалить',
                        style: 'destructive',
                        onPress: async () => {
                            try {
                                await fetchTodos(date);
                                await DB.removeElements(date, todoId);
                                navigation.navigate('Plan', {
                                    date: date.slice(1,9)
                                });
                                return;
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    ],
                    { cancelable: false }
                );
            };

            let content;
            if (todoTitle) {
                content = (
                    <View style = {{backgroundColor: THEME.MAIN_COLOR, height: '100%', width: '100%'}}>
                        <AppCard style={styles.card}>
                            <Text style={styles.title}>{todoTitle}</Text>
                            <AppButton onPress={() => setModal(true)}>
                                <FontAwesome name='edit' size={20} />
                            </AppButton>
                        </AppCard>

                        <View style={styles.buttons}>
                            <View style={styles.button}>
                                <AppButton
                                    onPress={() => navigation.navigate('Plan')}
                                    color={THEME.BUTTON_COLOR}
                                >
                                    <AntDesign name='back' size={20} color='#000' />
                                </AppButton>
                            </View>
                            <View style={styles.button}>
                                <AppButton
                                    color={THEME.DANGER_COLOR}
                                    onPress={() => removeTodo(todoTitle, JSON.stringify(date), navigation)}
                                >
                                    <FontAwesome name='remove' size={20} color='#000' />
                                </AppButton>
                            </View>
                        </View>
                    </View>);

                if (modal) {
                    content = (
                        <View style = {{backgroundColor: THEME.MAIN_COLOR, alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'}}>
                            <AppCard style = {{height: '30%', width: '90%'}}>
                                <EditModal
                                visible={modal}
                                value={todoTitle}
                                onCancel={() => setModal(false)}
                                onSave={saveHandler}
                                />
                            </AppCard>
                        </View>);
                }
            }
            if (!content) {
                return null;
            }
            return (
                <View>
                    {content}
                </View>
            )
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    card: {
        marginBottom: 30,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 15
    },
    button: {
        width: Dimensions.get('window').width > 400 ? 150 : 100
    },
    title: {
        fontSize: 20
    }
})

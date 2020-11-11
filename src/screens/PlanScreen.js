import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Text } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { ElementContext } from '../context/ElementContext';
import { DB } from '../db';
import { THEME } from '../THEME';

export const PlanScreen = ({route, navigation}) => {
    try {
        const {date} = route.params;
        
        const {todos, fetchTodos} = useContext(ElementContext);
        const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
        const [selectedId, setSelectedId] = useState(null);
        fetchTodos(JSON.stringify(date));

        useEffect(() => {
            const update = () => {
                const width = Dimensions.get('window').width;
                setDeviceWidth(width);
            };
            Dimensions.addEventListener('change', update);
            return () => {Dimensions.removeEventListener('change', update)};
        });

        const onOpen = (todo) => {
            setSelectedId(todo.id);
            navigation.navigate('Element', {
                date: date,
                id: todo.id
            });
        };

        const renderItem = ({item}) => {
            return <Todo width={deviceWidth} todo={item} date={JSON.stringify(date)} onOpen={() => onOpen(item)}/>
        };

        const listNull = () => {
            return (
                <View style={styles.notodo}>
                    <Text style={{fontSize: 30}}>Упс...</Text>
                    <Text>Ваш список дел пуст! Создайте план на этот день.</Text>
                </View>
            );
        };

        const onPress = async (value) => {
            try {
                setSelectedId(null)
                await DB.addElement(JSON.stringify(date), value).then(fetchTodos(JSON.stringify(date)))
            } catch (e) {
                console.log(e)
            }
        };

        let content = (
            <View style={{ width: deviceWidth }}>
                <FlatList
                style={{height: Dimensions.get('window').height - (Dimensions.get('window').height / 5)}}
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={renderItem}
                extraData={selectedId}
                ListEmptyComponent={listNull}
                />
            </View>
        );

        return (
            <View style={{backgroundColor: THEME.MAIN_COLOR}}>
                <AddTodo onPress={onPress}/>
                {content}
            </View>
        );
    } catch (error) {
        console.log(error);
        return (
            <View>
                <Text>Ошибка №2: Список дел не доступен.</Text>
                <Text>{error}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    notodo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: 10,
    }
})

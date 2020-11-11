import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { ElementDayAppButton } from '../components/ui/ElementDayAppButton';
import { DB } from '../db';
import { THEME } from '../THEME';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export function MainScreen({navigation}) {
    try {
        const onPress = (date) => {
            try {
                DB.addDb(date);
            } catch (e) {
                console.log(e);
            }
            
            navigation.navigate('Plan', {
                date: date
            });
        };

        return (
            <View style = {{backgroundColor: THEME.MAIN_COLOR}}>
                <View>
                    <ElementDayAppButton onPress={onPress} amount = '0' style={{width: width - 20, height: height / 4}}>Сегодня</ElementDayAppButton>
                </View>
                <View style = {styles.wrapper}>
                    <ElementDayAppButton onPress={onPress} amount = '1' type='day of week' style={{width: width / 2 - 20, height: height / 5}}></ElementDayAppButton>
                    <ElementDayAppButton onPress={onPress} amount = '2' type='day of week' style={{width: width / 2 - 20, height: height / 5}}></ElementDayAppButton>
                </View>
                <View style = {styles.wrapper}>
                    <ElementDayAppButton onPress={onPress} amount = '3' type='day of week' style={{width: width / 2 - 20, height: height / 6}}></ElementDayAppButton>
                    <ElementDayAppButton onPress={onPress} amount = '4' type='day of week' style={{width: width / 2 - 20, height: height / 6}}></ElementDayAppButton>
                </View>
                <View style = {styles.wrapper}>
                    <ElementDayAppButton onPress={onPress} amount = '5' type='day of week' style={{width: width / 2 - 20, height: height / 6}}></ElementDayAppButton>
                    <ElementDayAppButton onPress={onPress} amount = '6' type='day of week' style={{width: width / 2 - 20, height: height / 6}}></ElementDayAppButton>
                </View>
            </View>
        );
    } catch (error) {
        console.log(error);
        return (
            <View>
                <Text>Ошибка №1:</Text>
                <Text>{error}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
})
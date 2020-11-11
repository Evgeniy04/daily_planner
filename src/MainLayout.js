import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './navigation/Navigation';

export function MainLayout() {
    return (
        <NavigationContainer>
            <Navigation/>
        </NavigationContainer>
    );
}
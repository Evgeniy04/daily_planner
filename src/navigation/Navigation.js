import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from '../screens/MainScreen';
import { PlanScreen } from '../screens/PlanScreen';
import { ElementScreen } from '../screens/ElementScreen';
import { THEME } from '../THEME';

const Stack = createStackNavigator();
export function Navigation() {
    return (
        <Stack.Navigator 
        initialRouteName="Main"
        screenOptions={{
          title: 'DAILY PLANNER',
          headerTitleContainerStyle: {
            position: "absolute",
            alignItems: "center",
            justifyContent: "center"
          },

          headerTitleStyle: {
            flex: 1,
            color: THEME.HEADER_TITLE_COLOR,
            fontWeight: "bold",
          },

          headerStyle: {
            backgroundColor: THEME.BORDER_COLOR
          },
        }}
        >
          <Stack.Screen 
            name="Main"
            component={MainScreen}
          />
          <Stack.Screen 
            name="Plan"
            component={PlanScreen}
            options={{
              headerTitleContainerStyle: {
                flex: 1,
                marginRight: 50,
                alignItems: 'center',
              },
            }}
          />
          <Stack.Screen 
            name="Element"
            component={ElementScreen}
            options={{
              headerTitleContainerStyle: {
                flex: 1,
                marginRight: 50,
                alignItems: 'center',
              },
            }}
          />
        </Stack.Navigator>
    );
  }
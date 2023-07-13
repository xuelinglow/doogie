import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/mainScreen';
import ShoppingList from './screens/shoppingList';
import StockList from './screens/stockList'
import ItemList from './screens/itemList'
import EditList from './screens/editShoppingList'

import { Pressable, StyleSheet, Text } from 'react-native';


const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Shopping List" component={ShoppingList} />
        <Stack.Screen name="Stock List" component={StockList} />
        <Stack.Screen name="Item List" component={ItemList}  />
        <Stack.Screen name="Edit List" component={EditList}  />


      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default Navigation;


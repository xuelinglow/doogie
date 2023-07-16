import { Button, StyleSheet, Text, View, TextInput, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
//import data from '../data.js'

export default function ShoppingList({navigation}) {
  const [shoppingList, setshoppingList] = useState(data)

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SafeAreaView>
          <FlatList 
            data={shoppingList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {navigation.navigate('Item List', {data: item.details})}}>
                <View style={styles.item}>
                  <Text>{item.text}{"\n"}
                  {Object.keys(item.details).length ? <View><Text>Number of items: {Object.keys(item.details).length}</Text></View> : null}</Text> 
                  {/* return null if details does not exist, otherwise prints 'Number of items: length of details dict ' */}
                </View> 
              </TouchableOpacity>
            )
          }
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 25,
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row'
  },
});
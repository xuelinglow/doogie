import { Button, StyleSheet, Text, View, TextInput, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { db } from '../config'
import { ref, set, onValue } from "firebase/database";
import { useNavigation } from '@react-navigation/native';

export default function ShoppingList({navigation}) {
  const [shoppingList, setshoppingList] = useState();

  useEffect (() => {
    const testRef = ref(db, 'shoppinglists/');
    onValue(testRef, (snapshot) => {
        const data = Object.keys(snapshot.val()).map((abc) => {
          return ({name:abc, list: snapshot.val()[abc]})
        });
        setshoppingList(data)
    }) 
  }, []) 

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SafeAreaView>
          <FlatList 
            data={shoppingList}            
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {navigation.navigate('Item List', {listname: item.name})}}>
                <View style={styles.item}>
                  <Text>{item.name}{"\n"}
                  {Object.keys(item.list).length ? <View><Text>Number of items: {Object.keys(item.list).length}</Text></View> : null}</Text> 
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


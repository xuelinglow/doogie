import { Button, StyleSheet, Text, View, TextInput, FlatList, SafeAreaView } from 'react-native';
import React, {useState, useEffect} from 'react';
import AddItem from '../components/addItem';
import { db } from '../config'
import { ref, push, set, onValue } from "firebase/database";


export default function ItemList({route, navigation}) {
    const {itemname} = route.params;    
    const [groceryList, setgroceryList] = useState();
    const dataRef = ref(db, 'shoppinglists/'+ itemname);

    useEffect (() => {
         onValue(dataRef, (snapshot) => {
             const data = snapshot.val();
             const newItem = Object.keys(data).map(key => ({
                 name:data[key].name
             }))
             console.log(newItem)
             setgroceryList(newItem)
         }) 
    }, [])

    const submitHandler = (text) => {
      /*    setgroceryList((prevList) => {
           return [
             ...prevList, 
             { name:text }
           ]
         }
         ) */
        const newData = { name: text }
        const newChildRef = push(dataRef)
        set(newChildRef, newData)
        console.log(groceryList)
      }


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <FlatList
                    data={groceryList}
                    renderItem={({item}) =>
                    <View style={styles.item}>
                        <Text>{item.name}{"\n"}
                        {item.quantity ? <View><Text>Qty: {item.quantity}</Text></View> : null}</Text> 
                        </View> 
                    }
                    />
                </View>
            <AddItem submitHandler={submitHandler}/>
        </View>
    )
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
import { Button, StyleSheet, Text, View, Pressable, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AddItem from '../components/addItem';
import CharacterLimitedText from '../components/characterLimit'
import { db } from '../config'
import { ref, push, set, onValue, update } from "firebase/database";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ItemList({ route, navigation }) {
  const { listname } = route.params;
  const [groceryList, setgroceryList] = useState([]);
  const dataRef = ref(db, 'shoppinglists/' + listname);
  const EditButton = () => (
    <Pressable style={styles.button} onPress={() => navigation.navigate('Edit List', { listname: listname })}>
      <Text style={styles.text}>Edit</Text>
    </Pressable>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: EditButton,
    });

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const newItem = Object.keys(data).map(key => ({
        name: data[key].name,
        quantity: data[key].quantity,
        key: key
      }))

      setgroceryList(newItem)
    })
  }, [])

  const submitHandler = (text) => {
    if (text.trim() === '') {
      return;
    }
    const newData = { name: text, quantity: "" };
    const newChildRef = push(dataRef);
    set(newChildRef, newData);
  }

  const addQuantity = (item) => {
    const updatedQuantity = item.quantity ? parseInt(item.quantity) + 1 : 1;
    const updates = {};
    updates['shoppinglists/' + listname + '/' + item.key] = { name: item.name, quantity: updatedQuantity };
    update(ref(db), updates);
  }

  const subQuantity = (item) => {
    const updatedQuantity = item.quantity ? parseInt(item.quantity) - 1 : null;
    const updates = {};
    updates['shoppinglists/' + listname + '/' + item.key] = { name: item.name, quantity: updatedQuantity };
    update(ref(db), updates);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={groceryList}
          renderItem={({ item }) =>
            <View style={styles.item}>
              <Text><CharacterLimitedText text={item.name} characterLimit={20} />{"\n"}
                {item.quantity ? <View><Text>Qty: {item.quantity}</Text></View> : null}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => addQuantity(item)}>
                  <Icon name="plus" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ paddingHorizontal: 10 }} />
                <TouchableOpacity onPress={() => subQuantity(item)}>
                  <Icon name="minus" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          }
          keyExtractor={(item) => item.key}
        />
      </View>
      <AddItem submitHandler={submitHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 25,
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#ebebeb',
    alignSelf: 'flex-end',
    width: 70,
    right: 25,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 5,
  }
});

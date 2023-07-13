import { Button, StyleSheet, Text, View, Modal, FlatList, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import CharacterLimitedText from '../components/characterLimit'
import { db } from '../config';
import { ref, push, set, onValue, remove, update } from 'firebase/database';

export default function EditList({ route, navigation }) {
  const { listname } = route.params;git 
  const [groceryList, setGroceryList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [text, setText] = useState('');
  const [qty, setQty] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const dataRef = ref(db, 'shoppinglists/'+ listname);

  const deleteProduct = (productName) => {
    remove(ref(db, 'shoppinglists/' + listname + '/' + productName));     
  };

  const updateProduct = (item) => {
    if (isNaN(qty)) {
        Alert.alert('Error', 'Please enter a valid number.');
        return;
    }
    const updates = {};
    updates['shoppinglists/' + listname + '/' + item.key] = {name: text, quantity: qty};
    update(ref(db), updates);
    setModalVisible(false);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setText(item.name);
    setQty(item.quantity);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setText('');
    setQty('');
    setModalVisible(false);
  };

  useEffect(() => {
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newItem = Object.keys(data).map((key) => ({
          name: data[key].name,
          quantity: data[key].quantity,
          key: key,
        }));
        setGroceryList(newItem);
      } else {
        setGroceryList([]);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={groceryList}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>
                <CharacterLimitedText text={item.name} characterLimit={20} />
                {'\n'}
                {item.quantity ? (
                  <View>
                    <Text>Qty: {item.quantity}</Text>
                  </View>
                ) : null}
              </Text>
              <View style={styles.buttonContainer}>
              <Button onPress={() => deleteProduct(item.key)} title="Delete" />
              <View style={{paddingHorizontal: 10}} />
              <Button onPress={() => openModal(item)} title="Edit" />
              </View>
            </View>
          )}
        />
      </View>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Item name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
              />
              <Text style={styles.modalText}>Quantity</Text>
              <TextInput
                style={styles.input}
                onChangeText={setQty}
                value={qty.toString()}
                placeholder="Update Quantity"
              />
              <View style={{marginTop:5}}>
                <Button onPress={() => updateProduct(selectedItem)} title="Update" />
              </View>
            </View>
          </View>
        </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  centeredView: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  modalView: {
    backgroundColor: '#ffffff',
    margin: 50,
    padding: 40,
    borderRadius: 10,
  },
  modalText: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginBottom: 15,
    color: '#3D3D3D',
  },
  buttonContainer: {
    flexDirection: 'row'
  },
});


//unused code
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
    }
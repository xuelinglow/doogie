import React, {useState} from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import StockItem from './stockItem';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default function StockList({navigation}) {

  //first item is the name, and the second is the function to set the state
  const [stockItem, setStockItem] = useState();
  const [stockItems, setStockItems] = useState([]);

  const handleAddStockItem = () => {
    //console.log("happy");
    //Keyboard.dismiss();
    setStockItems([...stockItems, stockItem])
    setStockItem(null);
  }

  const deleteItem = (index) => {
    let itemsCopy = [...stockItems];
    itemsCopy.splice(index, 1);
    setStockItems(itemsCopy);
  }

  return (
    <View styles={styles.container}>
      <View styles={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>StockList</Text>
        <View styles={styles.item}>
          {
            stockItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress = {() => deleteItem(index)}>
                  <StockItem text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write your new stock'} 
        value={stockItem}
        onChangeText={text => setStockItem(text)}/>
      
        <TouchableOpacity onPress={() => handleAddStockItem()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>


    </View>

    
    
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFF',
  },
  tasksWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    paddingTop: 30,
    paddingLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    marginTop: 50,
  },
  writeTaskWrapper: {
    //width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60, 
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
  }
});
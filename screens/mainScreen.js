import { StyleSheet, View, Text, Button } from 'react-native';

export default function MainScreen({navigation}) {    
    return (
    <View>
        <Button title='To Stock List' onPress={() => navigation.navigate('Stock List')}/>
        <Button title='To Shopping List' onPress={() => navigation.navigate('Shopping List')}/>
    </View>
    )
}

/* hi its my first time using git so haha
im trying to get used to this*/

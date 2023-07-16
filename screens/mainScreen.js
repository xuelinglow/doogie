import { StyleSheet, View, Text, Button } from 'react-native';

export default function MainScreen({navigation}) {    
    return (
    <View style={styles.container}>
        <Button title='To Stock List' onPress={() => navigation.navigate('Stock List')}/>
        <Button title='To Shopping List' onPress={() => navigation.navigate('Shopping List')}/>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
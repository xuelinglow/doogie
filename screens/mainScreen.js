import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    title: {
        marginTop: 120,
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 100,
        textAlign: "center"
    },

    buttonBG: {
        backgroundColor: "#5f9ea0",
        padding: 5,
        margin: 5,
        borderRadius: 5,
        alignItems: "center",
    },

    textInBox: {
        textAlign: "center",
        color: "white",
        fontsize: 25,
        fontWeight: '600',
        padding: 10,
    },

    alignItems: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default function MainScreen({navigation}) {    
    return (
    <View style={styles.container}>
        
        <Text style={styles.title}> Grocery Manager </Text>
        <Image 
            source={require('../assets/mainscreenimg.png')}
            style={{
                width: "50%",
                height: 200,
                marginLeft: 100,
                marginBottom: 80,

        }}
        />
        <TouchableOpacity style={styles.buttonBG} onPress={() => navigation.navigate('Stock List')}>
            <Text style={styles.textInBox}>
                To Stock List
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBG} onPress={() => navigation.navigate('Shopping List')}>
            <Text style={styles.textInBox}>
                To Shopping List
            </Text>
        </TouchableOpacity>
    </View>

    );


}

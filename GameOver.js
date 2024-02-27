import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import randomColor from './functions/randomColor';

export default function GameOver({ setPage, diffuculty, finalScore }) {
    const diffucultyArray = ['Easy', 'Medium', 'Hard'];

    return (
        <LinearGradient style={styles.container} colors={[randomColor(), randomColor()]}>
            <Text style={styles.finalScore}>You Scored <Text style={styles.finalScoreScore}>{finalScore}</Text> on {diffucultyArray[diffuculty]}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setPage('home');
                }}>
                    <Text style={styles.buttonText}>Back To Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setPage('game');
                }}>
                    <Text style={styles.buttonText}>Play Again</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </LinearGradient>
    );
}

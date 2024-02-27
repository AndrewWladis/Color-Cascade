import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import randomColor from './functions/randomColor';

export default function Home({ setPage, setDiffuculty }) {
    return (
        <LinearGradient style={styles.container} colors={[randomColor(), randomColor()]}>
            <Text style={styles.title}>Color Cascade</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setDiffuculty(1);
                    setPage('game');
                }}>
                    <Text style={styles.buttonText}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setDiffuculty(2);
                    setPage('game');
                }}>
                    <Text style={styles.buttonText}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setDiffuculty(3);
                    setPage('game');
                }}>
                    <Text style={styles.buttonText}>Hard</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </LinearGradient>
    );
}

import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import styles from './Styles';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import randomColor from './functions/randomColor';

export default function GameOver({ setPage, diffuculty, finalScore, highScores }) {
    const [yourName, setYourName] = useState(null);
    const [hasDataBeenSent, setHasDataBeenSent] = useState(false);
    const diffucultyArray = ['Easy', 'Medium', 'Hard'];

    const showAlertWithInput = () => {
        Alert.prompt(
            'Enter your name for the leaderboard.',
            'Enter your name',
            (text) => setYourName(text),
            'plain-text',
        );
    };

    useEffect(() => {
        if (highScores !== null && highScores !== undefined && highScores.length !== 0 && !hasDataBeenSent) {
            if (highScores[highScores.length - 1].score < finalScore) {
                showAlertWithInput()
            }
        }
    }, [highScores]);

    useEffect(() => {
        if (yourName !== null && yourName !== "") {
            if (yourName.length > 10) {
                setYourName(yourName.slice(0, 10))
            }

            const addToLeaderboard = async () => {
                try {
                    const response = await fetch('https://correct-boxd-backend.onrender.com/cc-add-to-leaderboard', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: yourName,
                            score: finalScore
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                } catch (error) {
                    console.error('An error occurred:', error.message);
                    // Handle error accordingly
                } finally {
                    setHasDataBeenSent(true);
                }
            };

            addToLeaderboard();
        }
    }, [yourName])

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
            {(highScores.length > 0) ? (
                <View style={styles.highScores}>
                    <Text style={styles.highScoresTitle}>High Scores</Text>
                    {highScores.map((score, index) => {
                        return (
                            <Text key={index} style={styles.highScore}>{score.name} - {score.score}</Text>
                        );
                    })}
                </View>
            ) : null}
            <StatusBar style="auto" />
        </LinearGradient>
    );
}

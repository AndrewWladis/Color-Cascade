import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import randomColor from './functions/randomColor';
import Game from './Game';
import Home from './Home';
import GameOver from './GameOver';

export default function App() {
  const [page, setPage] = useState('home');
  const [diffuculty, setDiffuculty] = useState(1);
  const [finalScore, setFinalScore] = useState(0);

  const renderScreen = () => {
    switch (page) {
      case 'home':
        return <Home setPage={setPage} setDiffuculty={setDiffuculty} />;
      case 'game':
        return <Game setPage={setPage} diffuculty={diffuculty} setFinalScore={setFinalScore} />;
      case 'gameover':
        return <GameOver setPage={setPage} diffuculty={diffuculty} finalScore={finalScore} />;
      default:
        return <Home setPage={setPage} setDiffuculty={setDiffuculty} />;
    }
  }

  return (
    <>
      {renderScreen()}
    </>
  );
}

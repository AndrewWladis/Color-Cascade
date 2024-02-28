import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import randomColor from './functions/randomColor';

function returnColor(cell) {
  switch (cell) {
    case 0:
      return ['#f24949', '#c97171'];
    case 1:
      return ['#d959aa', '#e67ec0'];
    case 2:
      return ['#807ee6', '#3532e3'];
    case 3:
      return ['#98e2eb', '#c4f0f5'];
    case 4:
      return ['#32d16a', '#92f0b3'];
    case 5:
      return ['#f5ee69', '#d6cc0f'];
    case 6:
      return ['#e6af70', '#c97c24'];
    case 7:
      return ['#069928', '#597d61'];
    case 8:
      return ['#FFFFFF', '#ebe1c5'];
    case 9:
      return ['#333333', '#575757'];
    case 10:
      return ['#64c3e3', '#3688a3'];
    case 11:
      return ['#5c5c5c', '#5c5c5c'];
    default:
      return ['black', 'black'];
  }
}

export default function Game({ setPage, diffuculty, setFinalScore, setHighScores }) {
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState([]);
  const [colors, setColors] = useState([randomColor(), randomColor()]);
  const [changeFirstColor, setChangeFirstColor] = useState(false);
  const [selected, setSelected] = useState([]);

  const selectPiece = (i, j) => {
    if (board != [] && !board.includes([i, j]) && selected.length != 3) {
      setSelected([...selected, [i, j]])
    }
  };

  function checkForMatches() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const currentCell = board[i][j];
        const neighbors = [
          [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
          [i, j - 1], [i, j + 1],
          [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]
        ];

        let matchCount = 0;
        neighbors.forEach(([x, y]) => {
          if (x >= 0 && x < board.length && y >= 0 && y < board[i].length && board[x][y] === currentCell && board[x][y] !== 11) {
            matchCount++;
          }
        });

        if (matchCount >= 2) {
          return true;
        }
      }
    }
    return false;
  }

  useEffect(() => {
    const tempBoard = [];
    for (let i = 0; i < 7; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        if (diffuculty === 1) {
          row.push(Math.floor(Math.random() * 7));
        } else if (diffuculty === 2) {
          row.push(Math.floor(Math.random() * 9));
        } else if (diffuculty === 3) {
          row.push(Math.floor(Math.random() * 11));
        }
      }
      tempBoard.push(row);
    }
    setBoard(tempBoard);

    const fetchData = async () => {
      try {
        const response = await fetch('https://correct-boxd-backend.onrender.com/cc-leaderboard');

        if (!response.ok) {
          throw new Error('Network request failed');
        }

        const result = await response.json();

        // Filter out items without a name
        const filteredHighScores = result.filter(item => item.name);

        // Sort the filtered high scores by score in descending order
        const sortedHighScores = filteredHighScores.sort((a, b) => b.score - a.score).slice(0, 5);

        // Set the state with the filtered and sorted high scores
        setHighScores(sortedHighScores);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };


    fetchData();
  }, []);


  useEffect(() => {
    if (selected.length === 3) {
      const firstSelected = board[selected[0][0]][selected[0][1]];
      const secondSelected = board[selected[1][0]][selected[1][1]];
      const thirdSelected = board[selected[2][0]][selected[2][1]];
      const selectedSet = new Set(selected.map(JSON.stringify));

      if (firstSelected === secondSelected && secondSelected === thirdSelected && selectedSet.size === selected.length) {
        let connected = [false, false, false];
        // check perimeter of first, second, and third looking for another connected piece
        for (let i = 0; i < 3; i++) {
          const col = selected[i][0];
          const row = selected[i][1];

          [[col - 1, row - 1], [col, row - 1], [col + 1, row - 1], [col, row - 1], [col, row + 1], [col - 1, row + 1], [col - 1, row], [col + 1, row], [col + 1, row + 1]].forEach((cell) => {
            if (selected.some(coords => coords[0] === cell[0] && coords[1] === cell[1])) {
              connected[i] = true;
              connected[i] = true;
            }
          });
        }

        if (connected[0] === true && connected[1] === true && connected[2] === true) {
          setChangeFirstColor(!changeFirstColor);

          if (changeFirstColor) {
            setColors([randomColor(), colors[1]]);
          } else {
            setColors([colors[0], randomColor()]);
          }

          setScore(score + 90 + Math.floor(Math.random() * 20));
          const newBoard = board.map((col, i) => {
            return col.map((cell, j) => {
              if (selected.some(coords => coords[0] === i && coords[1] === j)) {
                return Math.floor(Math.random() * 8);
              } else {
                return cell;
              }
            });
          });
          setBoard(newBoard)

          setSelected([]);
        } else {
          setSelected([]);
        }
      } else {
        setSelected([]);
      }
    }
  }, [selected]);

  useEffect(() => {
    if (score > 0) {
      const randomNum = String(Math.floor(Math.random() * 500));

      if (randomNum.length == 2) {
        if (Number(randomNum.charAt(0)) <= 6 && Number(randomNum.charAt(1)) <= 6) {
          let newBoard = [...board];
          newBoard[Number(randomNum.charAt(1))][Number(randomNum.charAt(0))] = 11;
          setBoard(newBoard);
        }
      }

      const matches = checkForMatches();

      if (!matches) {
        setFinalScore(score);
        setPage('gameover');
      }
    }
  }, [board]);

  return (
    <LinearGradient style={styles.container} colors={colors}>
      <Text style={styles.score}>{score}</Text>
      <LinearGradient style={styles.board} colors={['#9c9c9c', '#d6d6d6']}>
        {board.map((col, i) => {
          return (
            <View key={i} style={{ flexDirection: 'column' }}>
              {col.map((cell, j) => {
                return (
                  <>
                    {cell === 11 ? (
                      // Display something else when cell equals 11
                      <View
                        key={j}
                        onPress={() => console.log(i, j)}
                        style={selected.some(coords => coords[0] === i && coords[1] === j) ? styles.selectedCell : { margin: 2 }}
                      >
                        <LinearGradient
                            style={styles.block}
                            colors={returnColor(cell)}
                          >
                          </LinearGradient>
                      </View>
                    ) : (
                      <TouchableOpacity
                        key={j}
                        onPress={() => selectPiece(i, j)}
                        style={selected.some(coords => coords[0] === i && coords[1] === j) ? styles.selectedCell : { margin: 2 }}
                      >
                        <LinearGradient
                            style={styles.cell}
                            colors={returnColor(cell)}
                          >
                          </LinearGradient>
                      </TouchableOpacity>
                    )}
                  </>
                );
              })}
            </View>
          );
        })}
      </LinearGradient>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

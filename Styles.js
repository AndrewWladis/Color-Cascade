import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  block: {
    width: 35,
    height: 35,
    borderRadius: 4,
    margin: 5,
  },
  board: {
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  cell: {
    width: 35,
    height: 35,
    borderRadius: 20,
    margin: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  finalScore: {
    color: 'white',
    fontSize: 35,
    fontWeight: '800',
    padding: 10,
    textAlign: 'center',
  },
  finalScoreScore: {
    color: 'yellow',
    fontSize: 45,
    fontWeight: '900',
  },
  highScore: {
    color: 'white',
    fontSize: 25,
    fontWeight: '800',
    padding: 10,
  },
  highScores: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  highScoresTitle: {
    color: 'white',
    fontSize: 35,
    fontWeight: '900',
    padding: 10,
  },
  score: {
    color: 'white',
    fontSize: 100,
    fontWeight: '900',
  },
  selectedCell: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: 37,
    fontWeight: '900',
  },
});

export default styles;
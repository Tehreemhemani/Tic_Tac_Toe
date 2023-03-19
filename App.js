import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity, FlatList, Image} from 'react-native';
import react from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const delay =ms => new Promise(res => setTimeout(res, ms));

export default function App() {

  const [ notification , setNotification ] = react.useState("Player X to start !")
  const [ refresh , setRefresh ] = react.useState("false")

  const [ board , setBoard ] = react.useState(
    [
      " "," "," ",
      " "," "," ",
      " "," "," ",
    ]
  )
   
   const [ currentPlayer , setCurrentPlayer ] = react.useState("x")

    const pressField = (index) => {
     let newBoard= board
     if (newBoard[index] !== "x" &&  newBoard[index] !== "o") {
     if(currentPlayer == "x"){
     newBoard[index] ="x"
     setCurrentPlayer("o")
     setNotification("Player x to move")

     }
     else{
     newBoard[index]="o"
     setCurrentPlayer("x")
     setNotification("Player o to move")
     }
     setBoard(newBoard)
     setRefresh(!refresh)
     checkIfPlayerWon()
     }
    }

    const checkIfPlayerWon = () => {
   if(board[0] == board[1] && board[1] == board[2] && board[0] != " "){
      playerWon(board[0]) // this board[0] is the symbol which one
    }else if(board[3] == board[4] && board[4] == board[5] && board[5] != " "){
        playerWon(board[3])
    }else if(board[6] == board[7] && board[7] == board[8] && board[8] != " "){
      playerWon(board[6])
    }else if(board[0] == board[4] && board[4] == board[8] && board[8] != " "){
      playerWon(board[0])
    }else if(board[2] == board[4] && board[4] == board[6] && board[6] != " "){
      playerWon(board[2])
    }else if(board[0] == board[3] && board[3] == board[6] && board[6] != " "){
      playerWon(board[0])
    }else if(board[1] == board[4] && board[4] == board[7] && board[7] != " "){
      playerWon(board[1])
    }else if(board[2] == board[5] && board[5] == board[8] && board[8] != " "){
      playerWon(board[2])
    }
  }

  const playerWon = async (symbol) =>{
    setNotification("Player" + symbol + "!won")
    await delay(2000)
    setBoard([
      " "," "," ",
      " "," "," ",
      " "," "," ",
    ]
  )
  if (symbol =="o"){
  setNotification("Player x to move" )
  }else{
    setNotification("Player o to move")
}
}
    
return (
    <View style={styles.container}>
      <Image
      source={require("./assets/bg.jpg")}
      style={styles.bg}
      />
    <StatusBar style="auto" />
      <Text style={styles.txt1}> TICTACTOE </Text>
      <Text style={styles.txt2}> {notification} </Text>

    <View style={styles.flatlist}>
      <Image
      source={require("./assets/board.png")}
      style={styles.image}
      />

      <FlatList
      style={styles.list}
      data={board}
      numColumns={3}
      refreshing={true}
      extraData={refresh}
      renderItem={({item,index})=>

      <TouchableOpacity style={styles.square} onPress={()=> pressField(index)}>

        <Text style={styles.txtXO}> {item} </Text>

       </TouchableOpacity>

      }
      />
      </View>
      
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1:{
    fontSize:50,
    position:"absolute",
    top:60,
    color:"white",
    


  },

  txt2:{
    fontSize:20,
    position:"absolute",
    top:130,
    color:"white"


  },

  txtXO:{
    fontSize:60,
    color:"white"

  },

  list:{
    width:300,
    height:300,
    },

    image:{
      width:300,
      height:300,
      position:"absolute"
      
  
    },

  square:{
    width:100,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
  
    },

    flatlist:{
    alignItems: 'center',
    justifyContent: 'center',
    height:370,
    width:"100%"

},

bg:{
  height:"100%",
  width:"100%",
  position:"absolute",
  zIndex:-1,
}

});



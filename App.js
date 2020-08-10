import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class App extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Yoooooooooooo from Ayman!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#cef',
    justifyContent: "center",
    alignItems: "center",  
  },
});

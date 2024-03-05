import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.productInput}>
        <TextInput
          style={styles.textInput}
          placeholder="product"
        />
        <TextInput
          style={styles.textInput}
          placeholder="amount"
        />

        <Button
          title="Save"
        />

      </View>

      <View style={styles.shoppingList} >
        <Text>Shopping list</Text>
      </View>
      <StatusBar style="auto" />
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
  productInput: {
    flex: 1,
    width: "100%",
    alignItems: "center", //2nd: vasen-oikea
    justifyContent: "flex-end" // primary: ylä-ala
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 2,
    width: "40%",
    marginBottom: "2%",
  },
  shoppingList: {
    flex: 4,
  }
});

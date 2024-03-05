import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {

  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState([]);

  const database = SQLite.openDatabase('itemsdb.db');

  useEffect(() => {
    database.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, product text, amount text);');
    }, () => console.error("Error when creating DB"), updateList);
  }, []);

  const saveItem = () => {
    database.transaction(tx => {
      tx.executeSql('insert into shoppinglist (product, amount) values (?, ?);',
        [product, amount]);
    }, null, updateList)
    setProduct("");
    setAmount("");
  }

  const updateList = () => {
    database.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
        setItems(rows._array)
      );
    }, null, null);
  }

  const deleteItem = (id) => {
    database.transaction(tx => {
      tx.executeSql('delete from shoppinglist where id = ?;', [id]);
    }, null, updateList)
  }


  return (
    <View style={styles.container}>
      <View style={styles.productInput}>
        <TextInput
          style={styles.textInput}
          placeholder="product"
          onChangeText={product => setProduct(product)}
          value={product}
        />
        <TextInput
          style={styles.textInput}
          placeholder="amount"
          onChangeText={amount => setAmount(amount)}
          value={amount}
        />

        <Button
          title="Save"
          onPress={saveItem}
        />

      </View>

      <View style={styles.shoppingList} >
        <Text>Shopping list</Text>

        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            <View style={styles.listContainer}>
              <Text>{item.product},{item.amount} </Text>
              <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>done</Text>
            </View>}
          data={items}
        />
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
    width: "70%",
    alignItems: "center"
  },
  listContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  }
});

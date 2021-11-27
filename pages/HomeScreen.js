import React, {useEffect} from 'react';
import {View, SafeAreaView, Alert} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import {openDatabase} from 'react-native-sqlite-storage';
import PouchDB from 'pouchdb-react-native'

var sqliteDB = openDatabase({name: 'sqlDataBase.db'});

const pouchDb = new PouchDB('mydb')
let lastID = '65'

var SharedPreferences = require('react-native-shared-preferences');
SharedPreferences.setItem("SharedPreferences1","valueOne");
SharedPreferences.setItem("key2","valueTwo");
SharedPreferences.setItem("key3","valueThree");

const readAllSharedPreferences = () => { SharedPreferences.getAll(function(values){
  alert(values);
});
}

const generateRandomNumber = () => {
  var randomNumber = Math.floor(Math.random() * 100) + 1;
  lastID = randomNumber.toString()
  return randomNumber.toString();
}

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    sqliteDB.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='kullanicilar'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS kullanicilar', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS kullanicilar(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(50), user_contact INT(15), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Mytext text="RDBMS | SQLite Örneği"/>
          <Mybutton
            title="Kayıt Ekle"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="Özel Kayıt Görüntüle"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="Tüm Kayıtları Görüntüle"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mytext text="NoSQL | PouchDB Örneği"/>
          <Mybutton
            title="Log Ekle"
            customClick={() => pouchDb.put({
              _id : generateRandomNumber(),
              logTime: new Date().toLocaleString(),
            }).then(function (response) {
              console.log(response)
              console.log(lastID)
            })}
          />
          <Mybutton
            title="Log Görüntüle"
            customClick={() =>
               pouchDb.get(lastID)
            .then(doc => alert(doc._id + " - " + doc.logTime))
          }
          />
          <Mybutton
            title="SharedPreferences Oku"
            customClick={() => readAllSharedPreferences()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

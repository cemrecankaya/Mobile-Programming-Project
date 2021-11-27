import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

var sqliteDB = openDatabase({name: 'sqlDataBase.db'});

const RegisterUser = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let register_user = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert('İsim Giriniz');
      return;
    }
    if (!userContact) {
      alert('İletişim Numarası Giriniz');
      return;
    }
    if (!userAddress) {
      alert('Adres Girin');
      return;
    }

    sqliteDB.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO kullanicilar (user_name, user_contact, user_address) VALUES (?,?,?)',
        [userName, userContact, userAddress],
        (tx, results) => {
          console.log('Sonuçlar', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Başarılı',
              'Kayıt Eklendi',
              [
                {
                  text: 'Tamamlandı',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Kayıt Eklenemedi');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="İsim Giriniz"
                onChangeText={(userName) => setUserName(userName)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="İletişim Numarası Giriniz"
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Adres Giriniz"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <Mybutton title="Kayıdı Ekle!" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;

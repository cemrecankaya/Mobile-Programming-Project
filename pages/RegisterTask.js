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

const RegisterTasks = ({navigation}) => {
  let [tasksName, setTasksName] = useState('');
  let [tasksDate, setTasksDate] = useState('');
  let [tasksDescp, setTasksDescp] = useState('');

  let register_tasks = () => {
    console.log(tasksName, tasksDate, tasksDescp);

    if (!tasksName) {
      alert('İsim Giriniz');
      return;
    }
    if (!tasksDate) {
      alert('İletişim Numarası Giriniz');
      return;
    }
    if (!tasksDescp) {
      alert('Adres Girin');
      return;
    }

    sqliteDB.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO tasks (task_name, task_date, task_descp) VALUES (?,?,?)',
        [tasksName, tasksDate, tasksDescp],
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
                placeholder="Proje İsim Giriniz"
                onChangeText={(tasksName) => setTasksName(tasksName)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Proje Tarih Giriniz (ör:12/13/2021)"
                onChangeText={(tasksDate) => setTasksDate(tasksDate)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Proje Açıklaması Giriniz"
                onChangeText={(tasksDescp) => setTasksDescp(tasksDescp)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <Mybutton title="Kayıdı Ekle!" customClick={register_tasks} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterTasks;

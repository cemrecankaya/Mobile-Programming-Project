import React, {useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

var sqliteDB = openDatabase({name: 'sqlDataBase.db'});

const ViewTask = () => {
  let [inputTaskId, setInputTaskId] = useState('');
  let [taskData, setTaskData] = useState({});

  let searchTask = () => {
    console.log(inputTaskId);
    setTaskData({});
    sqliteDB.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tasks where task_id = ?',
        [inputTaskId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setTaskData(results.rows.item(0));
          } else {
            alert('Böyle bir görev yok');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Mytextinput
            placeholder="Görev id girin"
            onChangeText={(inputTaskId) => setInputTaskId(inputTaskId)}
            style={{padding: 10}}
          />
          <Mybutton title="Kullanıcı Ara" customClick={searchTask} />
          <View style={{marginLeft: 35, marginRight: 35, marginTop: 10}}>
            <Text>Proje ID: {taskData.task_id}</Text>
            <Text>Proje İsim: {taskData.task_name}</Text>
            <Text>Proje Tarih: {taskData.task_date}</Text>
            <Text>Proje Açıklaması: {taskData.task_descp}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewTask;

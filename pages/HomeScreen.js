import React, {useEffect} from 'react';
import {View, SafeAreaView, Alert, Vibration} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import {openDatabase} from 'react-native-sqlite-storage';
import call from 'react-native-phone-call';
import PushNotification, {Importance} from 'react-native-push-notification';

var sqliteDB = openDatabase({name: 'sqlDataBase.db'});
var ws = new WebSocket('wss://echo.websocket.org');

var SharedPreferences = require('react-native-shared-preferences');
SharedPreferences.setName('shared_pref');
//SharedPreferences.clear()

const checkIsFirstTime = () => {
  SharedPreferences.getItem('isLogin', function (value) {
    if (value == null) {
      console.log('First time in app');
      Alert.alert(
        'Görünüşe göre aramıza ilk defa katıldın!\n' +
          'Ekranda bulunan çağrı yap butunu ile bizlere ulaşabilirsin :) ',
      );
      SharedPreferences.setItem('isLogin', '1');
    } else {
      console.log('Not first time..');
    }
  });
};
checkIsFirstTime();

ws.onopen = () => {
  const message = 'hello';
  ws.send(message);
  console.log(`Sent: ${message}`);
};
ws.onmessage = e => {
  console.log(`Received Project From Server: ${e.data}`);
  const message = e.data;
  const message_splitted = fullName.split(' ');
};

PushNotification.createChannel(
  {
    channelId: 'channel-id',
    channelName: 'My channel',
    channelDescription: 'A channel to categorise your notifications',
    playSound: true,
    soundName: 'notification.mp3',
    importance: Importance.HIGH,
    vibrate: true,
  },
  created => console.log(`createChannel returned '${created}'`),
);

const LocalNotification = () => {
  PushNotification.localNotification({
    channelId: 'channel-id',
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
};

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

const args = {
  number: '+905377304283',
  prompt: true,
};

const triggerCall = () => {
  call(args).catch(console.error);
};

const HomeScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({title: route.params.userName + ' Hoşgeldin!'});
    sqliteDB.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tasks'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS tasks', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS tasks(task_id INTEGER PRIMARY KEY AUTOINCREMENT, task_name VARCHAR(50), task_date VARCHAR(50), task_descp VARCHAR(255))',
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
          <Mytext text="RDBMS | SQLite Örneği" />
          <Mybutton
            title="Proje Görevi Ekle"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="Proje Görevi Ara"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="Tüm Görevleri Sorgula"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mytext text="NoSQL | PouchDB Örneği" />
          <Mybutton title="Make a Call" customClick={() => triggerCall()} />
          <Mybutton
            title="Vibrate with pattern"
            customClick={() => Vibration.vibrate(PATTERN)}
          />
          <Mybutton
            title="Show Notfication"
            customClick={() => LocalNotification()}
          />
          {route.params.role === 0 && (
            <Mybutton
              title="Tüm Görevleri temizle"
              customClick={() => LocalNotification()}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

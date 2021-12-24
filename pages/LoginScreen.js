import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Vibration,
  Text,
  Image,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import 'react-native-gesture-handler';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';

const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  const users = [
    {
      userName: 'Admin',
      password: '1234',
      role: 0,
    },
    {
      userName: 'Fehmi',
      password: '1234',
      role: 1,
    },
    {
      userName: 'Tolunay',
      password: '1234',
      role: 1,
    },
  ];

  const Login = () => {
    if (userName === '') {
      setAlert('Kullanıcı adı gerekli!');
    } else if (password === '') {
      setAlert('Şifre gerekli!');
    } else {
      let temp = users.findIndex(item => item.userName === userName);
      console.log(temp);
      if (temp !== -1) {
        if (users[temp].password === password) {
          setAlert('');
          navigation.replace('HomeScreen', {
            userName: userName,
            role: users[temp].role,
          });
        } else {
          setAlert('Hatalı Şifre!');
        }
      } else {
        setAlert('Hatalı kullanıcı adı!');
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: 300,
              paddingHorizontal: 10,
            }}>
            <Image
              style={{height: 300, width: '100%', resizeMode: 'contain'}}
              source={require('./assets/logo.png')}
            />
          </View>
          <View
            style={{
              marginHorizontal: 20,
              borderRadius: 10,
              height: 50,
              elevation: 9,
              marginVertical: 5,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#00000030',
              overflow: 'hidden',
            }}>
            <TextInput
              placeholder="Kullanıcı adı"
              style={{
                flex: 1,
                textAlign: 'center',
                marginHorizontal: 5,
                fontSize: 18,
              }}
              value={userName}
              onChangeText={e => {
                setAlert('');
                setUserName(e);
              }}></TextInput>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              borderRadius: 10,
              height: 50,
              elevation: 9,
              marginVertical: 5,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#00000030',
              overflow: 'hidden',
            }}>
            <TextInput
              placeholder="Şifre"
              secureTextEntry
              style={{
                flex: 1,
                textAlign: 'center',
                marginHorizontal: 5,
                fontSize: 18,
              }}
              value={password}
              onChangeText={e => {
                setAlert('');
                setPassword(e);
              }}></TextInput>
          </View>
          {alert !== '' && (
            <View style={{alignItems: 'center', marginVertical: 20}}>
              <Text>{alert}</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={Login}
            activeOpacity={0.5}
            style={{
              marginHorizontal: 100,
              borderRadius: 20,
              height: 50,
              elevation: 9,
              marginVertical: 5,
              backgroundColor: '#f4511e',
              borderWidth: 2,
              borderColor: '#FFFFFF90',
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>Giriş</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

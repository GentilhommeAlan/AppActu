import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image,Linking,Pressable,SafeAreaView,ScrollView,ScrollViewComponent,StyleSheet, Text, View } from 'react-native';
import { useFonts, Roboto_300Light, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function Details({ route }) {
const { title, img, description, content, url } = route.params;
  let [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_700Bold
  });


  if (!fontsLoaded) {
    return <Text>Erreur de la police</Text>;
  }

  function redirectUrl() : void {
    Linking.openURL(url);
  }
  return (
    <ScrollView style={styles.container}>
        <View style={{backgroundColor: '#f4511e'}}>
            <Text style={styles.title}>{ title }</Text>
        </View>
        <Image  source={{uri : img}} style={{width: '100%', height: 200, marginTop: 0}}></Image>
        <View style={{paddingHorizontal: 10}}>
            <Text style={{fontWeight: '600', marginVertical: 35 }} > {description} </Text>
            <Text> {content} </Text>
            <Pressable onPress={redirectUrl} style={{backgroundColor: '#f4511e', justifyContent: 'center', alignItems: 'center', height: 80, borderRadius: 15, marginTop: 50}}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Lire l'article en entier </Text>
            </Pressable>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  actu: {
    marginBottom: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
    backgroundColor: 'white'
  },
  title: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 25,
    paddingVertical: 25,
    paddingHorizontal: 15,
    color: 'white'
  },
  button: {
    backgroundColor: '#f4511e', 
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderRadius: 15,
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  }
});

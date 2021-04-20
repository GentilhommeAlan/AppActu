import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image,Pressable,SafeAreaView,ScrollView,ScrollViewComponent,StyleSheet, Text, View, RefreshControl } from 'react-native';
import { useFonts, Roboto_300Light, Roboto_700Bold } from '@expo-google-fonts/roboto';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import actu, {article} from './interfaces/actu.interfaces';

const wait = (timeout: number) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

export default function Home({ navigation }) {
  const [tabActu, setTabActu] = useState<Array<article>>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
    getActu;
  }, []);

  let [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_700Bold
  });

  useEffect(() => {
    getActu();
  }, []);

  function getActu() : void {
    axios.get('https://newsapi.org/v2/top-headlines?apiKey=7be3682babef494790e0da1d0c1962a5&country=fr')
    .then((value: AxiosResponse<actu>) => {
      setTabActu(value.data.articles);
    })
    .catch((reason) => {
      alert(reason)
    })
  }

  if (!fontsLoaded) {
    return <Text>Erreur de la police</Text>;
  }
  return (
    <View style={styles.container}>
            <ScrollView style={{paddingHorizontal: 20, paddingTop: 30}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>       
              {
                tabActu?.map((tabActu, index) => {
                  return (
                    <Pressable key={index} onPress={() => {
                        navigation.navigate('Details', {
                          title: tabActu.title,
                          img: tabActu.urlToImage,
                          description: tabActu.description,
                          content: tabActu.content,
                          url: tabActu.url
                        });
                      }}>

                    <View style={styles.actu} key={index} >
                        {
                            tabActu.urlToImage &&  
                            <Image  source={{uri : tabActu.urlToImage}} style={{width: '100%', height: 200, borderTopRightRadius: 15, borderTopLeftRadius: 15}}></Image>
                        }
                      <View style={{padding: 10}}>
                        <Text style={styles.title}>{tabActu.title}</Text>
                        <Text>{tabActu.source.name}</Text>
                      </View>
                    </View>
                    </Pressable>
                  )
                }
                )
              }
          </ScrollView>
    </View>
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
    fontSize: 20
  }
});

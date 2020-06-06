import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';

interface Params { 
  point_id: number
}

interface Point {
  id: number,
  name: string,
  image: string,
  image_url: string,
  email: string,
  whatsapp: string,
  city: string,
  uf: string,
  items: {
    title: string,
  }[]
}

const Detail = () => {
  const [point, setPoint] = useState<Point>({} as Point);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/points/${routeParams.point_id}`);

      setPoint(data);
    })();
  }, [routeParams.point_id])

  const handleNavigateBack = () => {
    navigation.goBack();
  }

  const handleWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=${point.whatsapp}&text=Tenho interesse na coleta de residuos`);
  }

  const handleComposeMail = async () => {
    await MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [point.email],
    });
  }

  if(!point.id)
    return <AppLoading />

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: point.image_url }} />

        <Text style={styles.pointName}>{point.name}</Text>
        <Text style={styles.pointItems}>{point.items.map(item => item.title).join(', ')}</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{point.city}, {point.uf}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Feather name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>E-Mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;

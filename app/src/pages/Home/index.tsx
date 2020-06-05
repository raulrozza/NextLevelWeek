import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, ImageBackground, Image, Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Select, { PickerStyle } from 'react-native-picker-select';
import axios from 'axios';


interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigation = useNavigation();

  const inputStyle = {
    inputAndroid: {
      fontSize: 16,
      color: "#222",
    },
    inputIOS: {
      fontSize: 16,
      color: "#222",
    },
  } as PickerStyle;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

      setUfs(data.map(city => city.sigla));
    })();
  }, [])

  useEffect(() => {
    (async () => {
      if(selectedUf === '0')
        return;
      
      const { data } = await axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`);

      setCities(data.map(uf => uf.nome));
    })();
  }, [selectedUf]);

  const handleNavigationToPoints = () => {
    navigation.navigate('Points', {
      city: selectedCity,
      uf: selectedUf,
    });
  }

  return (
    <ImageBackground source={require('../../assets/home-background.png')} imageStyle={{ width: 274, height: 368 }} style={styles.container}>
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <Select
            onValueChange={(value) => setSelectedUf(value)}
            value={selectedUf}
            placeholder={{ label: 'Selecione uma UF', value: null }}
            style={inputStyle}
            items={[
              ...ufs.map(
                uf => {
                  return {
                    label: uf,
                    value: uf,
                    key: uf,
                  }
                })
            ]}
          />
        </View>

        <View style={styles.inputContainer}>
          <Select
            onValueChange={(value) => setSelectedCity(value)}
            value={selectedCity}
            placeholder={{ label: 'Selecione uma Cidade' }}
            style={inputStyle}
            items={cities.map(
              city => {
                return {
                  label: city,
                  value: city,
                  key: city,
                }
              })
            }
          />
        </View>

        <RectButton style={styles.button} onPress={handleNavigationToPoints}>
          <View style={styles.buttonIcon}>
            <Feather name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  inputContainer: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;

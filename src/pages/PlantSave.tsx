import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SvgFromUri } from 'react-native-svg'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { StyleSheet, View, Text, Image, Platform, Alert, TouchableOpacity } from 'react-native'

import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { format, isBefore } from 'date-fns'
import { PlantProps, savePlant } from '../libs/storage'
import { ScrollView } from 'react-native-gesture-handler'

interface Params {
  plant: PlantProps
}

export function PlantSave() {
  const navigation = useNavigation()
  const [selectedDateTime, setDateTime] = useState(new Date())
  const [openedPicker, setOpenedPiker] = useState(Platform.OS === 'ios' )

  const route = useRoute()
  const { plant } = route.params as Params

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if(Platform.OS === 'android') {
      setOpenedPiker(oldState => !oldState)
    }

    if(dateTime && isBefore(dateTime, new Date())) {
      setDateTime(new Date())
      return Alert.alert('Não consegimos selecionar essa data', 'escolha uma data válida')
    }

    if(dateTime)
     setDateTime(dateTime)
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      })

      navigation.navigate('confirmation',{
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Muito Obrigado :D',
        icon: 'hug',
        nextScreen: 'myPlants'
      })

    } catch {
      Alert.alert('Ops', 'Não foi possível salvar.')
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}> 
          <SvgFromUri
            uri={plant.photo}
            width={150}
            height={150}
          />

          <Text style={styles.plantName}>
          {plant.name}
          </Text>
          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image 
              source={waterdrop}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>


          {openedPicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode='time'
              display='spinner'
              onChange={handleChangeTime}
            />
          )}

          {
            Platform.OS === 'android' && (
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => 
                  setOpenedPiker(oldState => !oldState)
                }
              >
                <Text style={styles.dateTimeText}>
                  {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }

          <Button 
            title="Cadastrar planta"
            onPress={handleSave}
          />

          
        </View>
      </View>
    </ScrollView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },

  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },

  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },

  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },

  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20
  },

  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },

  tipImage: {
    width: 56,
    height: 56
  },
  
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17
  },

  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },

  dateTimeButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },

  dateTimeText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  }
})
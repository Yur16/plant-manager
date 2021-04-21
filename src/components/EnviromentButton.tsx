import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface enviromentButtonProps extends RectButtonProps {
  title: string,
  active?: boolean
}

export function EnviromentButton({
  title,
  active = false,
  ...rest
}: enviromentButtonProps) {
  return (
    <RectButton
      style={[
        styles.container, 
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text 
        style={[
          styles.text,
          active && styles.textActive
        ]}>
        { title }
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    width: 76,
    height: 40,
    borderRadius: 12,
    marginHorizontal: 5,

    alignItems: 'center',
    justifyContent: 'center'
  },

  containerActive: {
    backgroundColor: colors.green_light
  },

  text: {
    color: colors.heading,
    fontFamily: fonts.text
  },

  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }

})
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity, Text, View } from 'react-native';

const ButtonIcon = ({ iconSize, iconName, iconColor, text }) => {
  return (
    <View>
      <TouchableOpacity>
        <Icon size={iconSize} name={iconName} color={iconColor} />
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonIcon;

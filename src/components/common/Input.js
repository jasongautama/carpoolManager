import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({label, value, onChangeText, placeHolder, secureTextEntry, editable}) => {

    const {inputStyle, labelStyle, containerStyle} = styles;

    return (
        <View style={containerStyle}>
          <Text style={labelStyle}>{label}</Text>
          <TextInput
             secureTextEntry={secureTextEntry}
             placeholder={placeHolder}
             autoCorrect={false}
             style={inputStyle}
             value={value}
             onChangeText={onChangeText}
             editable={editable}
          />
        </View>

    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23, //how much space between each line of text
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
};


export {Input};

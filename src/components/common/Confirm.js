import React from 'react';
import {Text, View, Modal} from 'react-native';
import {CardSection} from './CardSection';
import {Button} from './Button';

const Confirm = ({children, visible, onConfirm}) => {
    const {containerStyle, textStyle, cardSectionStyle} = styles;
    return (
    <Modal
      visible={visible} //either true or false
      transparant
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
          <CardSection style={cardSectionStyle}>
              <Text style={textStyle}>{children}</Text>
          </CardSection>

          <CardSection>
              <Button onPress={onConfirm}>OK</Button>
          </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    bacgroundColor: 'rgba(0, 0, 0, 0.75)', //give opacity of 0.75
    flex: 1,
    position: 'relative',
    justifyContent: 'center'
  }
};

export {Confirm};


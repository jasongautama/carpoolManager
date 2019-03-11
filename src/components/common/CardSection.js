import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    //{props.children} is the text that will be written by the caller (child)
    //<CardSection> tag
    return (
        //if there's better style 'props.style, then use that; Else, just use containerStyle
        <View style={[styles.containerStyle, props.style]}> 
         {props.children} 
        </View>
    );
};

const styles = {
    containerStyle: {
       borderBottomWidth: 1,
       padding: 5,
       backgroundColor: '#fff',
       justifyContent: 'flex-start',
       flexDirection: 'row',
       borderColor: '#ddd',
       position: 'relative' 
    }

}

export { CardSection };

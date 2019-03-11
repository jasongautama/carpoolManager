/* The purpose of this class is to make the style for the component good */

import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View> 
        //reason why we use {} is because <View> is react-native,
        //and we want to add styles, which is react
    );
};

const styles = {
    containerStyle: {
        borderWidth: 1, // 1 pixel of border width of the above
        borderRadius: 2, //round them off nicely at the edges
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1, //provide darkness [0 - 1]
        shadowRadius: 2,
        elevation: 1,
        // provide space of the device
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10, //give space between cards
    }

}

export { Card };
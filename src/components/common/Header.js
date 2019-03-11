// 1. import libraries for making components
import React from 'react';
import { Text, View } from 'react-native';

// 2. Make component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
     //syntax is called 'Prop(erties)
    <View style={viewStyle}>
        <Text style={textStyle}> {props.headerText} </Text>
    </View>    
    );
};

const styles = {
    viewStyle: {
        backgroundColor:'#F8F8F8',
        alignItems:'center',
        justifyContent: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width:0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    }
    
}

// 3. Make the component available to other parts of the app
export { Header }; // allow other files to use this component
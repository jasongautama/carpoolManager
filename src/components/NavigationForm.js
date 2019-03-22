import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'; //Router
import {Button, CardSection, Confirm} from './common';
import {submitForm} from '../actions';
import {addressUpdate} from '../actions';
import BackgroundImage from './BackgroundImage';

class NavigationForm extends Component {

    state = {
        showError: false,
        origin: null
    }

    updateOrigin() {
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            
            var geo = `${lat},${long}`
            this.props.addressUpdate({prop:'origin', value: geo})
        }) 
    }
    componentDidUpdate(prevProps) {
        if (prevProps.origin != this.props.origin) {
            this.updateOrigin()
        }
    }

    componentWillMount() {
        this.updateOrigin();
    }

    onButtonPress() {

        // if one of the fields is empty, display error
        if (!this.props.origin || !this.props.destination) {
            this.setState({showError: !this.state.showError})
            return this.render()
        }

        this.props.submitForm()
        Actions.navigationSummary({routes: this.props});
    }

    onError() {
        this.setState({showError: false});
    }

    render() {
        const {backgroundImage, descContainerStyle, inputStyle, inputContainerStyle, textStyle} = styles;

        return(
            <BackgroundImage style={backgroundImage}>
                <View style={descContainerStyle}>
                    <Text style={styles.textStyle}>
                        enter Destination
                    </Text>
                </View>

                <View style={inputContainerStyle}>
                    <TextInput
                    placeholder= "123 Main St, Seattle, WA"
                    value={this.props.destination}
                    autoCorrect={false}
                    style={inputStyle}
                    onChangeText={text => this.props.addressUpdate({prop: 'destination', value:text})}
                    
                    />
                </View>

                <Confirm
                visible={this.state.showError}
                onConfirm= {this.onError.bind(this)}
                >
                  Field(s) cannot be empty!
              </Confirm>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}> 
                        Start Navigation
                    </Button> 
                </CardSection>
            </BackgroundImage>
        );
    }
}

const styles={
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        paddingTop:100
    },
    textStyle: {
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    descContainerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative' 
     },
     inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23, //how much space between each line of text
        flex: 2
    },
    inputContainerStyle: {
        height: 40,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
     }
}

const mapStateToProps = (state) => {
    const {origin, destination} = state.navigationForm;
    return {origin, destination};
}
export default connect(mapStateToProps, {submitForm, addressUpdate})(NavigationForm);
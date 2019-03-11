import React from 'react';
import {ImageBackground} from 'react-native';

const BackgroundImage = (props) => {
    const uri = 'https://66.media.tumblr.com/e442ee18f851b7d40bb46a8ac66cb461/tumblr_nxs547nP7f1rhzsiwo1_500.jpg';

    return(
        <ImageBackground 
            style={[styles.backgroundImage, props.style]}
            source={{uri}}>
                {props.children}
        </ImageBackground>
    );
};

const styles = {
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
}

export default BackgroundImage;
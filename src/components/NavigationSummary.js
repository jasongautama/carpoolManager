import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, Linking } from 'react-native'
import _ from 'lodash'
import { GOOGLE_API } from 'react-native-dotenv'
import MapView, { Marker } from 'react-native-maps'
import { CardSection, Button } from './common'

class NavigationSummary extends Component {
    state = {
        data: [], //data to store .json response from google
        coord: [],
        mapRef: null
    }

    componentWillMount() {
        const multipleWayPts = 2
        const { origin, destination } = this.props.routes
        console.log(this.props)

        const length = this.props.routes.waypoints.length
        var or = origin.replace(/ /g, "+");
        var des = destination.replace(/ /g, "+");
        var wp = ""

        //one waypoint
        if (length < multipleWayPts) {
            const { address } = this.props.routes.member
            wp = address.replace(/ /g, "+")
        }
        else {
            for (var i = 0; i < length; i++) {
                const { address } = this.props.routes.waypoints[i]
                var temp = address.replace(/ /g, "+")
                wp += temp + "|"
            }
        }

        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${or}&destination=${des}&waypoints=optimize:true|${wp}&key=${GOOGLE_API}`)
            .then((response) => response.json())
            .then((responseJson) => {
                const data = responseJson.routes[0].legs
                this.setState({ data });
            })
            .catch((error) => {
                console.error(error);
            })
    }

    numStrFunc(num) {
        if (num == -1)
            return `Destination`
        var arr = [11, 12, 13]
        if (!arr.includes(num % 100)) {
            switch (num % 10) {
                case 0:
                    return `Current Location`
                case 1:
                    return `${num}st stop`
                case 2:
                    return `${num}nd stop`
                case 3:
                    return `${num}rd stop`
                default:
                    return `${num}th stop`
            }
        }
        return `${num}st stop`
    }
    markerFunc(addrArr, address, location, num) {
        var numStr = this.numStrFunc(num)

        addrArr.push(address)
        var marker = {
            name: numStr,
            description: `${address}`,
            coordinates: {
                latitude: location.lat,
                longitude: location.lng
            }
        }

        return marker
    }

    render() {
        //const {origin, destination} = this.props.routes
        var addr = []
        var markers = []
        var strURL = "https://www.google.com/maps/dir/"

        //if data has not yet return from Google, return empty
        if (!(this.state.data && this.state.data.length))
            return null

        //generate URL link for Google Maps
        numOfRoutes = this.state.data.length
        console.log(numOfRoutes)

        console.log(this.props)
        console.log(this.state.data)

        var count = 0
        for (var i = 0; i < numOfRoutes; i++) {
            const { start_address, end_address, start_location, end_location } = this.state.data[i]
            var marker = null

            marker = this.markerFunc(addr, start_address, start_location, count)
            markers.push(marker)
            count++

            if (i == numOfRoutes - 1) {
                marker = this.markerFunc(addr, end_address, end_location, -1)
                markers.push(marker)
                count++
            }

        }

        for (var i = 0; i < markers.length; i++) {
            this.state.coord.push(markers[i].coordinates)
        }

        for (var i = 0; i < addr.length; i++) {
            strURL += addr[i].replace(/ /g, "+")
            strURL += "/"
        }

        return (
            <View style={styles.container}>
                <MapView
                    ref={map => {
                        if (!map) {
                            return
                        }
                        console.log(map)
                        this.state.mapRef = map
                    }}
                    style={styles.map}
                    initialRegion={{
                        latitude: 47.6068,
                        longitude: -122.3351,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5
                    }}
                    onLayout={() => {
                        if (this.state.coord) {
                            this.state.mapRef.fitToCoordinates(this.state.coord,
                                {
                                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                                    animated: true
                                }
                            )
                        }
                    }}
                >

                    {
                        markers.map((marker, index) => (

                            <Marker
                                key={index}
                                title={marker.name}
                                coordinate={marker.coordinates}
                                description={marker.description}
                            />

                        ))
                    }

                </MapView>

                <View style={styles.button}>
                    <Button onPress={() => Linking.openURL(strURL)}>
                        Start Navigation
                    </Button>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.9
    },
    map: {
        flex: 0.9
    },
    button: {
        flex: 0.1,
        flexDirection: 'column'
    }

});

export default NavigationSummary
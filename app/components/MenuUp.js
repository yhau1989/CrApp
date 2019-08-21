import * as React from 'react';
import { View, StyleSheet, AppRegistry, Text, Image, TouchableOpacity} from 'react-native';




export default class MenuUp extends React.Component {
    render() {
        return (       
            <View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.boxlateral} >
                        <TouchableOpacity>
                            <Image source={require('../assets/left-arrow.png')} style={styles.imgArrow} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%', height: 50, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                    <View style={styles.boxlateral} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        fontWeight: '700',
    },
    boxlateral: {
        width: '25%', 
        height: 50, 
        backgroundColor: 'grey'
    },
    imgArrow: {
        margin: 10,
    },
});

//AppRegistry.registerComponent('MenuUp', () => MenuUp);
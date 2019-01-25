/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import BroadcastView from 'rn-broadcast-view';
import AstbeltActivityIndicator from 'rn-astbelt-activity-indicator';
import RangeSlider from 'rn-range-slider';
import TextButton from './components/TextButton';

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            broadcasting: false,
            astbeltProgress: 0,
            rangeLow: 0,
            rangeHigh: 100,
        };
    }

    render() {
        const minValue = 0;
        const maxValue = 100;
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>

                    <View style={styles.itemContainer}>
                        <TextButton text={'broadcast'}
                                    onPress={() => this.setState({broadcasting: !this.state.broadcasting})}
                                    containerStyle={styles.button}
                        />
                        <BroadcastView style={{width: 100, height: 100}} broadcasting={this.state.broadcasting}/>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.itemContainer}>
                        <RangeSlider
                            rangeEnabled={false}
                            style={{width: 160, height: 70}}
                            onValueChanged={(low, high, fromUser) => {
                                if (fromUser) {
                                    this.setState({astbeltProgress: (low - minValue) / (maxValue - minValue)})
                                }
                            }}
                            min={minValue}
                            max={maxValue}
                        />
                        <AstbeltActivityIndicator style={{width: 100, height: 100}}
                                                  progress={this.state.astbeltProgress}/>

                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.itemContainer}>
                        <RangeSlider
                            gravity={'center'}
                            labelStyle={'bubble'}
                            style={{width: 200, height: 70}}
                            min={minValue}
                            max={maxValue}
                            step={1}
                            onValueChanged={(low, high, fromUser) => {
                                if (fromUser) {
                                    this.setState({rangeLow: low, rangeHigh: high})
                                }
                            }}/>
                        <Text style={{
                            fontSize: 20,
                            color: '#fff'
                        }}>{'[' + this.state.rangeLow + ', ' + this.state.rangeHigh + ']'}</Text>
                    </View>
                    <View style={styles.divider}/>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#303232',
    },
    itemContainer: {
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
    },
    button: {
        height: 44,
        width: 100,
        backgroundColor: '#4286f4',
    },
    divider: {
        height: 1,
        backgroundColor: '#9aa'
    },
});
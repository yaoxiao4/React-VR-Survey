import React from 'react';
import {
    asset,
    View,
    Image,
    VrButton,
} from 'react-vr';

export default class ProgressBar extends React.Component {
    render() {
        const {progress} = this.props,
            barWidth = 0.8;

        const styles = {
            container : {
                borderColor: 'white',
                borderRadius: 0.1,
                borderWidth: 0.005,
                width: barWidth,
                height: 0.05,
                position: 'absolute',
                layoutOrigin: [0.5, 0.5],
                transform: [{
                    translate: [0, -1, -2]
                }]
            },
            progressBar: {
                width: this.props.progress*barWidth,
                height: 0.04,
                backgroundColor: 'blue'
            }
        };

        return (
            <View style={styles.container}>
                <View style={styles.progressBar}/>
            </View>
        );
    };
}

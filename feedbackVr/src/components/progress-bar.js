import React from 'react';
import {
    asset,
    View,
    Image,
    Text,
    VrButton,
} from 'react-vr';

export default class ProgressBar extends React.Component {
    render() {
        const {progress} = this.props,
            barWidth = 0.4;

        const styles = {
            container : {
                borderColor: '#e5b13a',
                borderRadius: 0,
                borderWidth: 0.005,
                padding: 0.005,
                width: barWidth,
                backgroundColor: 'black',
                height: 0.05,
                position: 'absolute',
                layoutOrigin: [0, 0],
                overflow: 'hidden',
                transform: [{
                    translate: [-0.1, -0.18, 0]
                },
                {
                    rotateX: 0
                }]
            },
            progressBar: {
                width: Math.max(0, this.props.progress*barWidth - 0.01),
                height: 0.040,
                borderColor: '#e5b13a',
                backgroundColor: '#2FF923',
            }
        };

        return (
            <View style={styles.container}>
                <View style={styles.progressBar}>

                </View>
                <Text style={{
                    fontSize: 0.025,
                    textAlign: 'center',
                    transform: [{
                        translate: [0, 0.035, 0]
                    }],
                }}>
                    Progress {this.props.progress * 100} %
                </Text>
            </View>
        );
    };
}

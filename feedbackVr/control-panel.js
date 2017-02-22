import React from 'react';
import {
    asset,
    Text,
    View,
    Image,
    VrButton,
} from 'react-vr';

const buttonStyling = {
    width: 0.5,
    height: 0.5,
    layoutOrigin: [0.5, 0.5],
};

const leftButtonStyling = {
    ...buttonStyling,
    transform: [{
        translate: [-0.5, 0, -3],
    }]
};

const rightButtonStyling = {
    ...buttonStyling,
    transform: [{
        translate: [0, 0, -3],
    }]
};

const arrowStyling = {
    width: 0.5,
    height: 0.5
};

const leftArrowStyling = {
    ...arrowStyling,
    transform: [{
        rotateY: 180
    }]
}

export default class ControlPanel extends React.Component {
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
              <VrButton style={leftButtonStyling}>
                <Image
                    source={asset('arrow_new.png')}
                    style={leftArrowStyling}>
                </Image>
              </VrButton>

              <VrButton style={rightButtonStyling}>
              <Image
                  source={asset('arrow_new.png')}
                  style={arrowStyling}>
                </Image>
              </VrButton>
            </View>
        );
    }
}

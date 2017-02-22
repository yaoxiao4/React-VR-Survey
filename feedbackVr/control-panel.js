import React from 'react';
import {
    asset,
    View,
    Image,
    VrButton,
} from 'react-vr';

const buttonStyling = {
    position: 'absolute',
    width: 0.5,
    height: 0.25,
    layoutOrigin: [0.5, 0.5],
};

const leftButtonStyling = {
    ...buttonStyling,
    transform: [{
        translate: [-0.5, 0.5, -1.5],
    }]
};

const rightButtonStyling = {
    ...buttonStyling,
    transform: [{
        translate: [0.5, 0.5, -1.5],
    }]
};

const arrowStyling = {
    width: 0.5,
    height: 0.4,
    overlayColor: 'red'
};

const leftArrowStyling = {
    ...arrowStyling,
    height: 0.35
}

export default class ControlPanel extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
              <VrButton
                style={leftButtonStyling}
                onClick={() => this.props.onArrowClick(true)}>
                <Image
                    source={asset('prev2.jpg')}
                    style={leftArrowStyling}>
                </Image>
              </VrButton>

              <VrButton
                style={rightButtonStyling}
                onClick={() => this.props.onArrowClick(false)}>
              <Image
                  source={asset('next2.jpg')}
                  style={arrowStyling}>
                </Image>
              </VrButton>
            </View>
        );
    }
}

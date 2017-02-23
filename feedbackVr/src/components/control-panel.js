import React from 'react';
import {
    asset,
    View,
    Image,
    Text,
    VrButton,
} from 'react-vr';
import ProgressBar from './progress-bar';

const textStyling = {
    fontSize: 0.02
};

const buttonStyling = {
    position: 'absolute',
    width: 0.5,
    height: 0.25,
};

const leftButtonStyling = {
    ...buttonStyling,
    transform: [{
        translate: [0, -0.076, 0.05],
    }]
};

const rightButtonStyling = {
    ...buttonStyling,
    transform: [{
        translate: [0.1, -0.076, 0.05],
    }]
};

const arrowStyling = {
    width: 0.1,
    height: 0.1,
    overlayColor: 'red',
};

const leftArrowStyling = {
    ...arrowStyling,
    transform: [
    {  
        rotateZ: -180,
    }]
}

export default class ControlPanel extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <View style={{
                height: 0.2,
                width: 0.2,
                layoutOrigin: [0.5, 0.5],
                transform: [{
                    translate: [0, -0.15, -0.5]
                }, 
                {
                    rotateX: -45
                }]
            }}>
              <VrButton
                style={leftButtonStyling}
                onClick={() => this.props.onArrowClick(true)}>
                <Image
                    source={asset('next2.jpg')}
                    style={leftArrowStyling}>
                </Image>
                <Text style={{...textStyling,
                    transform: [{
                        translate: [0.038, 0.009, 0],
                    }]
                }}> 
                Prev
                </Text>
              </VrButton>

              <VrButton
                style={rightButtonStyling}
                onClick={() => this.props.onArrowClick(false)}>
              <Image
                  source={asset('next2.jpg')}
                  style={arrowStyling}>
                </Image>
                <Text style={{...textStyling,
                    transform: [{
                        translate: [0.022, 0.009, 0],
                    }]
                }}> 
                Next
                </Text>
              </VrButton>
              <ProgressBar progress={this.props.progress}/>
            </View>
        );
    }
}

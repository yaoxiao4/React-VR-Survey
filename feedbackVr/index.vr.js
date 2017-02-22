import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Image,
  VrButton,
} from 'react-vr';

class FeedbackVR extends React.Component {
  _onViewClicked() {
    alert('aya');
  }

  render() {
    return (
      <View>
        <Pano style={{backgroundColor: 'white'}}/>
        <Text
          style={{
            padding: 0.02,
            textAlign:'center',
            textAlignVertical:'center',
            fontSize: 0.8,
            layoutOrigin: [0.5, 0.5],
            transform: [{
              translate: [0, 4, 0]
            },
            {
              rotateY: 0
            },
            {
              rotateX: 90
            }],
          }}>
          Medallia VR Team
        </Text>

        <VrButton
          style={{width: 0.7}}
          onClick={()=>this._onViewClicked()}>
          <Image
            source={asset('cat.jpg')}
            style={{
              width: 2,
              height: 2,
              layoutOrigin: [0.5, 0.5],
              transform: [{
                translate: [0, 0, -5],
              },
              {
                rotateY: 0
              },
              {
                rotateX: 0
              }],
            }}
          />
        </VrButton>
      </View>
    );
  }
};

AppRegistry.registerComponent('feedbackVr', () => FeedbackVR);

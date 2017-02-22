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
import stubs from './src/stubs.js';
import SurveyQuestion from './src/components/survey_question/survey-question';

import ControlPanel from './control-panel';

class FeedbackVR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        shouldShowText: false,
        index: 0 // index of current question in position center
    };
    this.onQuestionClick = this.onQuestionClick.bind(this);
    this.selectNextQuestion = this.selectNextQuestion.bind(this);
  }

  on_click() {
    this.setState({shouldShowText: true});

    setTimeout(()=> {
      this.setState({shouldShowText: false});
    }, 3000)
  }

  onQuestionClick(value) {

  }

  selectNextQuestion(goLeft) {
      if ((goLeft && this.state.index) === 0 || (!goLeft && this.state.index === stubs.length - 1)) {
          return;
      }
      const newIndex = goLeft ? this.state.index - 1 : this.state.index + 1;
      this.setState({index: newIndex});
  }

  render() {
    const {shouldShowText} = this.state,
        {index} = this.state;

    return (
      <View>
        <Pano source={asset('earth.jpg')}/>
        <VrButton
          style={{width: 1}}
          onClick={()=>this.on_click()}>
          <Text
            style={{
              backgroundColor: 'blue',
              textAlign:'center',
              textAlignVertical:'center',
              fontSize: 0.2,
              layoutOrigin: [0.5, 0.5],
              transform: [{translate: [0, 3, -3]}],
            }}>
            push me
          </Text>
        </VrButton>

        {shouldShowText &&
        <Image
          source={asset('confetti.gif')}
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
          }}>
        </Image>
        }

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

        <SurveyQuestion position='center' question={ stubs[index] } />
        {(index > 0) && <SurveyQuestion position='left' question={ stubs[index - 1] } />}
        {(index < stubs.length - 1) && <SurveyQuestion position='right' question={ stubs[index + 1] } />}

        <ControlPanel onArrowClick={this.selectNextQuestion}/>
      </View>
    );
  }
};

AppRegistry.registerComponent('feedbackVr', () => FeedbackVR);

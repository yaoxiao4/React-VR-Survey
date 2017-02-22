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
import ControlPanel from './src/components/control-panel';
import ProgressBar from './src/components/progress-bar';

class FeedbackVR extends React.Component {
  constructor(props) {
    super(props);

    const questions = stubs.map(question => {
    	return {
    		title: question.title,
    		choices: question.choices,
    		selected: 0,
    	}
    });

    this.state = {
    	shouldShowText: false,
        index: 0, // index of current question in position center
    	questions,
    	progress: 0,
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

  onQuestionClick(value, question) {
  	let newQuestions;
  	for (let i = 0; i < this.state.questions.length; i++) {
  		if (this.state.questions[i].title == question.title) {
  			newQuestions = [...this.state.questions];
  			newQuestions[i].selected = value;
  			this.setState({
  				questions: newQuestions,
  			});
  		}
  	}

  	// Update progress
  	const length = this.state.questions.length;
  	let count = 0;
  	newQuestions.forEach(question => {
  		if (question.selected) {
  			count++;
  		}
  	})

  	this.setState({
  		progress: count/length
  	});
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
          style={{width: 1,
              position:'absolute',
              layoutOrigin: [0.5, 0.5],
              transform: [{translate: [0, 1.5, -3]}]
          }}
          onClick={()=>this.on_click()}>
          <Image
              source={asset('submit.jpg')}
              style={{
                  position: 'absolute',
                  height: 0.25,
                  width: 0.9,
              }}>
          </Image>
        </VrButton>

        {shouldShowText &&
        <Image
          source={asset('confetti.gif')}
          style={{
            position: 'absolute',
            height: 3,
            width: 4,
            layoutOrigin: [0.5, 0.5],
            transform: [{translate: [0, 0, -2]}],
          }}>
        </Image>
        }

        <Image
          source={asset('borge.jpg')}
          style={{
            position: 'absolute',
            height: 3,
            width: 3,
            layoutOrigin: [0.5, 0.5],
            transform: [{translate: [0, 0, 5]}],
          }}>
        </Image>

        <Text
          style={{
            position: 'absolute',
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

        <SurveyQuestion
            position='center'
            question={ this.state.questions[index] }
            onQuestionClick={ this.onQuestionClick }/>
        {(index > 0) &&
            <SurveyQuestion
                position='left'
                question={ this.state.questions[index - 1] }
                onQuestionClick={ this.onQuestionClick }/>}

        {(index < this.state.questions.length - 1) &&
            <SurveyQuestion
                position='right'
                question={ this.state.questions[index + 1] }
                onQuestionClick={ this.onQuestionClick }/>}

        <ControlPanel onArrowClick={this.selectNextQuestion}/>
      </View>
    );
  }
};

AppRegistry.registerComponent('feedbackVr', () => FeedbackVR);

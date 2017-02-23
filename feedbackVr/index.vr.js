import React from 'react';
import {
	AppRegistry,
	asset,
	StyleSheet,
	Pano,
	Text,
	View,
	Mesh,
	Image,
	Sound,
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
    	reachEndLeft: false,
    	reachEndRight: false,
    	score: 0,
    	submitted: false,
    };

    this.reset = this.reset.bind(this);
    this.onQuestionClick = this.onQuestionClick.bind(this);
    this.selectNextQuestion = this.selectNextQuestion.bind(this);
  }

  on_click() {
    let correctCount = 0;
    this.state.questions.forEach(question => {
    	if (question['choices'][question.selected - 1].correct) {
    		console.log(question['choices'][question.selected])
    		correctCount ++;
    	}
    });

   	const correctPercentage = correctCount/this.state.questions.length;
    this.setState({shouldShowText: true, score: correctPercentage, submitted: true});

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

  reset() {
  	const questions = stubs.map(question => {
  		return {
  			title: question.title,
  			choices: question.choices,
  			selected: 0,
  		}
  	});
  	this.setState({
  		questions,
  		progress: 0,
  		score: 0,
  		submitted: false,
  	});
  }

  selectNextQuestion(goLeft) {
      if ((goLeft && this.state.index) === 0) {
          return;
      }

      if (!goLeft && this.state.index === stubs.length - 1) {
      	return;
      }
      if ((goLeft && this.state.index) === 1) {
      	  this.setState({
      	  	reachEndLeft: true
      	  });
      } else {
      	this.setState({
      		reachEndLeft: false
      	});
      }

      if (!goLeft && this.state.index === stubs.length - 2) {
      	this.setState({
      		reachEndRight: true
      	});
      } else {
      	this.setState({
      		reachEndRight: false
      	});
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


        {this.state.progress === 1 &&
            <VrButton
              style={{width: 1,
                  position:'absolute',
                  layoutOrigin: [0.5, 0.5],
                  transform: [{translate: [0.15, 1.2, -3]}]
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
        }

        {!shouldShowText && this.state.submitted &&
        	<Text
        		style={{
        		    position: 'absolute',
        		    height: 1,
        		    fontSize: 0.2,
        		    width: 2,
        		    layoutOrigin: [0, 0],
        		    transform: [{translate: [-0.35, 0.95, -3]}]
        		}}>
        		Score: {this.state.score * 100 + '%'}
        	</Text>
        }


        {shouldShowText &&
            <Image
              source={asset('miko2.png')}
              style={{
                position: 'absolute',
                height: 0.2,
                width: 0.4,
                layoutOrigin: [0.5, 0.5],
                transform: [{translate: [0, 0, -0.2]}],
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
            width: 4,
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
          Mimi Lee
          Yao Xiao
          Daniel Wu
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
        {(index > 1) &&
            <SurveyQuestion
                position='backLeft'
                question={ this.state.questions[index - 1] }
                onQuestionClick={ this.onQuestionClick }/>}

        {(index < this.state.questions.length - 1) &&
            <SurveyQuestion
                position='right'
                question={ this.state.questions[index + 1] }
                onQuestionClick={ this.onQuestionClick }/>}
        {(index < this.state.questions.length - 2) &&
            <SurveyQuestion
                position='backRight'
                question={ this.state.questions[index + 2] }
                onQuestionClick={ this.onQuestionClick }/>}
        <View>
		    <ControlPanel reachEndLeft={this.state.reachEndLeft} reachEndRight={this.state.reachEndRight} progress={this.state.progress} onReset={this.reset} onArrowClick={this.selectNextQuestion}/>
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('feedbackVr', () => FeedbackVR);

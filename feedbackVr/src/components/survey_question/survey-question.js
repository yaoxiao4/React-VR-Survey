import React from 'react';
import {
	Text,
	asset,
	View,
	Image,
	VrButton,
} from 'react-vr';

function SurveyQuestion(props) {
	const {
		onQuestionClick,
		question,
		position,
	} = props;

	let style = {
		position: 'absolute',
	    width: 5.2,
	    height: 2,
	    padding: 0.02,
	    layoutOrigin: [0.5, 0.5],
	    transform: [],
	};

  	switch (position) {
  		case 'center':
	  		style.transform = [
		  		{
		  			translate: [0, 0, -5],
		  		},
		  		{
		  			rotateY: 0
		  		},
		  		{
		  			rotateX: 0
		  		}
	  		];
	  		break;
		case 'left':
	  		style.transform = [
		  		{
		  			translate: [-5, 0, -2],
		  		},
		  		{
		  			rotateY: 60
		  		},
		  		{
		  			rotateX: 0
		  		}
	  		];
	  		break;
  		case 'right':
	  		style.transform = [
		  		{
		  			translate: [5, 0, -2],
		  		},
		  		{
		  			rotateY: -60
		  		},
		  		{
		  			rotateX: 0
		  		}
	  		];
	  		break;
	  	case 'backLeft':
	  		style.transform = [
		  		{
		  			translate: [-5, 0, 4],
		  		},
		  		{
		  			rotateY: 130
		  		},
		  		{
		  			rotateX: 0
		  		}
	  		];
	  		break;
	  	case 'backRight':
	  		style.transform = [
		  		{
		  			translate: [5, 0, 4],
		  		},
		  		{
		  			rotateY: -120
		  		},
		  		{
		  			rotateX: 0
		  		}
	  		];
	  		break;
  	}

	const answersEl = question.choices.map(choice => {
		let choiceStyle = {
			backgroundColor: 'white',
			margin: 0.02,
		};

		if (question.selected == choice.value) {
			choiceStyle.backgroundColor = '#e5b13a';
		}

		return (
			<VrButton style={choiceStyle} key={choice.value} onClick={() => onQuestionClick(choice.value, question)}>
				<Text style={{
					fontSize: 0.15,
					marginLeft: 0.1,
					textAlign: 'center',
					color: 'black',
				}}>
					{choice.text}
				</Text>
			</VrButton>
		)
	});

	return (
		<View style={{...style}}>
			<Text style={{
				color: '#e5b13a',
				textAlign: 'center',
				fontSize: 0.3,
				padding: 0.02,
				marginBottom: 0.1,
				textShadowColor: '#e5b13a',
				textShadowOffset: {width: 5, height: 5},
				textShadowRadius: 5,
			}}>
				{question.title}
			</Text>
			{answersEl}
		</View>
	);
}

export default SurveyQuestion;

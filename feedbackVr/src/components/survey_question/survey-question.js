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
		onClickQuestion,
		question,
		position,
	} = props;

	let style = {
		position: 'absolute',
	    width: 3,
	    height: 2,
	    padding: 0.02,
	    backgroundColor: 'black',
	    layoutOrigin: [0.5, 0.5],
	    transform: [],
	};

  	switch (position) {
  		case 'center':
	  		style.transform = [
		  		{
		  			translate: [0, 1, -2],
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
		  			translate: [-5, 1, -1],
		  		},
		  		{
		  			rotateY: 40
		  		},
		  		{
		  			rotateX: 0
		  		}
	  		];
	  		break;
  		case 'right':
	  		style.transform = [
		  		{
		  			translate: [5, 1, -1],
		  		},
		  		{
		  			rotateY: -40
		  		},
		  		{
		  			rotateX: 0
		  		}
	  		];
	  		break;
  	}

	const answersEl = question.choices.map(question => {
		return (
			<Text key={question.value} style={{
				fontSize: 0.15,
				marginLeft: 0.1,
			}}>
				* {question.text}
			</Text>
		)
	});

	return (
		<View>
			<Image
				source={asset('black.jpg')}
			 	style={style}>
			  	<Text style={{
			  		color: 'white',
			  		textAlign: 'center',
			  		fontSize: 0.2,
			  		marginBottom: 0.1,
			  	}}>
			  		{question.title}
			  	</Text>
			  	{answersEl}

			</Image>
		</View>
	);
}

export default SurveyQuestion;

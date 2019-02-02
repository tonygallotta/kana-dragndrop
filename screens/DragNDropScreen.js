import React from 'react';
import {
  Animated,
  Button,
  Image,
  Platform,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScreenOrientation } from 'expo';
import _ from 'underscore';
import { HIRAGANA, KATAKANA } from '../constants/Kana';
import Clock from '../components/Clock';

class KanaEnglishPair extends React.Component {

  constructor () {
    super()
    this.state = {
      location: {}, 
      matched: false
    }
    this.onMatched.bind(this)
  }
  
  componentDidMount() {
    // this.layout = event.nativeEvent.layout
    this.view && setTimeout(this.measureView.bind(this), 500)
  }

  measureView() {
    this.view.measure(this.onMeasure.bind(this))
  }

  onMeasure(x, y, width, height, pageX, pageY) {
    const location = {
      x: pageX,
      y: pageY,
      width: width,
      height: height
    }
    this.state.location = location
  }

  onMatched() {
    this.setState({matched: true})
    this.onMatchedHandler()
  }

  render() {
  	const englishChar = this.props.englishChar;
  	const englishCharStyle = englishChar.length > 2 || /^(m|w).$/.test(englishChar) ? 
  		styles.englishCharLong : styles.englishChar;
    const kanaCharacterStyle = this.state.matched ? styles.kanaCharacterMatchedStyle :
      styles.kanaCharacterUnmatchedStyle 
    this.onMatchedHandler = this.props.onMatchedHandler
    let column = 'A'
    switch (englishChar[0]) {
      case "n":
        column = englishChar.length == 1 ? 'W' : 'N'
        break
      case "t":
      case "c":
        // fall through
        column = 'T'
        break
      case "h":
      case "f":
        column = 'H'
        break
      case "k":
      case "s":
      case "m":
      case "r":
      case "y":
      case "w":
        column = englishChar[0].toUpperCase()
        break
    }
    return <View style={styles.kanaEnglishPairContainer}>
  		<View style={styles.kanaInput} onLayout={this.onLayout} ref={(ref) => {this.view = ref}}>
        <Text style={kanaCharacterStyle}>{this.props.kanaCharacter}</Text>
      </View>
  		<Text style={[englishCharStyle, styles['column' + column]]}>{this.props.englishChar}</Text>
  	</View>
  }
}

class KanaEnglishPairBlank extends React.Component {
  render() {
      return <View style={styles.kanaEnglishPairContainer} />
  }
}

class KanaCharacter extends React.Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY(),
      showDraggable: true,
    };
    // Make sure we only compute this once so the characters aren't bouncing around the screen
    this.marginStyle = {
      marginTop: _.random(0, 15),
      marginLeft: _.random(0, 15),
    }
  }

  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value)
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropArea(gesture, this.props.kanaCharacter)) {
          this.setState({showDraggable: false })
          this.onDropAreaHit()
        } else {
          console.log("drop area MISSED!")
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start();
        }
      }
    })
    // adjusting delta value
    this.state.pan.setValue({x: 0, y: 0})
  }

  render() {
    this.isDropArea = this.props.isDropArea
    this.onDropAreaHit = this.props.onDropAreaHit
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    }
    const marginStyle = this.marginStyle
    if (this.state.showDraggable) {
      return <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, marginStyle]}>
        <Text style={styles.kanaCharacter}>{this.props.kanaCharacter.kanaCharacter}</Text>
      </Animated.View>
    } else {
      return <View style={[styles.kanaDraggableMatchedStyle, marginStyle]}>
        <Text />
      </View>
    }
  }
}

export default class DragNDropScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
  }

  constructor () {
    super()
    this.dropTargets = []
    this.matched = []
  }

  componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }

  componentWillUnmount () {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  createDraggables () {
    let kana = []
    const kanaSet = _.shuffle(this.kanaSet)
    for (let i = 0; i < 46; i++) {
      kana.push(<KanaCharacter key={i + 1} 
        kanaCharacter={kanaSet[i]} 
        isDropArea={this.isDropArea.bind(this)} 
        onDropAreaHit={this.onDropAreaHit(kanaSet[i]).bind(this)}
        />)
    }
    return kana
  }

  onDropAreaHit(kanaCharacter) {
    return () => {
      this.dropTargets[kanaCharacter.id].onMatched()
    }
  }

  onMatch(id) {
    return () => {
      this.matched.push(id)
      if (this.matched.length == 46) {
        console.log("All targets matched!")
        this.props.navigation.navigate("Win")
      }
    }
  }

  isDropArea(gesture, kanaCharacter) {
    const targetComponent = this.dropTargets[kanaCharacter.id]
    const targetLayout = targetComponent.state.location
    // give some tolerance on each side, more on the right since that's where the labels are
    const leftBound = targetLayout.x - 10
    const rightBound = targetLayout.x + targetLayout.width + 20
    const upperBound = targetLayout.y + targetLayout.height + 5
    const lowerBound = targetLayout.y - 5

    console.log("gesture location: ", gesture.moveX, gesture.moveY)
    console.log("target bounds: ", leftBound, rightBound, lowerBound, upperBound)
    const insideBounds = gesture.moveX >= leftBound && gesture.moveX <= rightBound && 
      gesture.moveY >= lowerBound && gesture.moveY <= upperBound;
    console.log("inside bounds? ", insideBounds)
    return insideBounds
  }

  createPairView (key, english) {
    const kana = this.kanaSet[key - 1].kanaCharacter
    return <KanaEnglishPair 
      key={key} 
      englishChar={english} 
      kanaCharacter={kana} 
      ref={(ref) => {this.dropTargets[key] = ref}}
      onMatchedHandler={this.onMatch(key).bind(this)}
      />
  }

  render() {
    const kanaType = this.props.navigation.getParam('kanaType', 'hiragana');
    this.kanaSet = kanaType == 'hiragana' ? HIRAGANA : KATAKANA;
    return (
      <View style={styles.container}>
      	<View style={{
          flex: 7,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
        }}>
          <View style={[styles.kanaColumn, styles.columnWa]}>
          	{this.createPairView(44, "wa")}
          	<KanaEnglishPairBlank />
          	{this.createPairView(45, "wo")}
          	<KanaEnglishPairBlank />
          	{this.createPairView(46, "n")}
        	</View>
          <View style={[styles.kanaColumn, styles.columnRa]}>
          	{this.createPairView(39, "ra")}
          	{this.createPairView(40, "ri")}
          	{this.createPairView(41, "ru")}
          	{this.createPairView(42, "re")}
          	{this.createPairView(43, "ro")}
        	</View>
          <View style={[styles.kanaColumn, styles.columnYa]}>
          	{this.createPairView(36, "ya")}
          	<KanaEnglishPairBlank />
          	{this.createPairView(37, "yu")}
          	<KanaEnglishPairBlank />
          	{this.createPairView(38, "yo")}
        	</View>
          <View style={[styles.kanaColumn, styles.columnMa]}>
          	{this.createPairView(31, "ma")}
          	{this.createPairView(32, "mi")}
          	{this.createPairView(33, "mu")}
          	{this.createPairView(34, "me")}
          	{this.createPairView(35, "mo")}
        	</View>
          <View style={[styles.kanaColumn, styles.columnHa]}>
            {this.createPairView(26, "ha")}
            {this.createPairView(27, "hi")}
            {this.createPairView(28, "fu")}
            {this.createPairView(29, "he")}
            {this.createPairView(30, "ho")}
          </View>
          <View style={[styles.kanaColumn, styles.columnNa]}>
          	{this.createPairView(21, "na")}
          	{this.createPairView(22, "ni")}
          	{this.createPairView(23, "nu")}
          	{this.createPairView(24, "ne")}
          	{this.createPairView(25, "no" )}
        	</View>
          <View style={[styles.kanaColumn, styles.columnTa]}>
          	{this.createPairView(16, "ta")}
          	{this.createPairView(17, "chi")}
          	{this.createPairView(18, "tsu")}
          	{this.createPairView(19, "te")}
          	{this.createPairView(20, "to")}
        	</View>
          <View style={[styles.kanaColumn, styles.columnSa]}>
          	{this.createPairView(11, "sa")}
          	{this.createPairView(12, "shi")}
          	{this.createPairView(13, "su")}
          	{this.createPairView(14, "se")}
          	{this.createPairView(15, "so")}
        	</View>
          <View style={[styles.kanaColumn, styles.columnKa]}>
          	{this.createPairView(6, "ka")}
          	{this.createPairView(7, "ki" )}
          	{this.createPairView(8, "ku" )}
          	{this.createPairView(9, "ke" )}
          	{this.createPairView(10, "ko" )}
        	</View>
          <View style={[styles.kanaColumn, styles.columnA]}>
            {this.createPairView(1, "a")}
            {this.createPairView(2, "i" )}
            {this.createPairView(3, "u" )}
            {this.createPairView(4, "e" )}
            {this.createPairView(5, "o" )}
          </View>
    	</View>
      <View style={styles.kanaToDragContainer}>
        {this.createDraggables()}
        <Clock />
      </View>
    </View>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    marginTop: 20,
    backgroundColor: 'darkslategrey',
  },
	kanaColumn: {
		width: 54, 
  //   borderWidth: 1,
		// borderColor: 'deepskyblue',
		textAlign: 'right',
	},
  columnA: {
    color: 'red',
  },
  columnK: {
    color: 'gold',
  },
  columnS: {
    color: 'orange',
  },
  columnT: {
    color: 'lime',
  },
  columnN: {
    color: 'deepskyblue',
  },
  columnH: {
    color: 'magenta',
  },
  columnM: {
    color: 'red',
  },
  columnR: {
    color: 'gold',
  },
  columnY: {
    color: 'orange',
  },
  columnW: {
    color: 'lime',
  },
  kanaCharacter: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    width: 30,
  },
	englishChar: {
		// color: 'white',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 4,
		textAlign: 'right',
		width: 22,
    fontFamily: 'zcool',
    fontSize: 20,
	},
	englishCharLong: {
		// color: 'white',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 0,
		textAlign: 'right',
		width: 22,
    fontFamily: 'zcool',
    fontSize: 18,
	},
	kanaInput: {
		height: 20,
		width: 20,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: '#fff',
	},
  kanaDraggableMatchedStyle: {
    width: 30,
  },
  kanaCharacterMatchedStyle: {
    color: 'black'
  },
  kanaCharacterUnmatchedStyle: {
    color: 'white'
  },
	kanaEnglishPairContainer: {
		flex: 2,
		flexDirection: 'row',
	},
  kanaToDragContainer: {
    flex: 3, 
    flexDirection: 'row', 
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    alignSelf: 'baseline',
    flexWrap: 'wrap',
    color: 'white',
  }
})
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

const HIRAGANA = [
  {id: 1, englishCharacter: "a", kanaCharacter: "あ"}, 
  {id: 2, englishCharacter: "i", kanaCharacter: "い"},
  {id: 3, englishCharacter: "u", kanaCharacter: "う"},
  {id: 4, englishCharacter: "e", kanaCharacter: "え"},
  {id: 5, englishCharacter: "o", kanaCharacter: "お"},
  {id: 6, englishCharacter: "ka", kanaCharacter: "か"},
  {id: 7, englishCharacter: "ki", kanaCharacter: "き"},
  {id: 8, englishCharacter: "ku", kanaCharacter: "く"},
  {id: 9, englishCharacter: "ke", kanaCharacter: "け"},
  {id: 10, englishCharacter: "ko", kanaCharacter: "こ"},
  {id: 11, englishCharacter: "sa", kanaCharacter: "さ"},
  {id: 12, englishCharacter: "shi", kanaCharacter: "し"},
  {id: 13, englishCharacter: "su", kanaCharacter: "す"},
  {id: 14, englishCharacter: "se", kanaCharacter: "せ"},
  {id: 15, englishCharacter: "so", kanaCharacter: "そ"},
  {id: 16, englishCharacter: "ta", kanaCharacter: "た"},
  {id: 17, englishCharacter: "chi", kanaCharacter: "ち"},
  {id: 18, englishCharacter: "tsu", kanaCharacter: "つ"},
  {id: 19, englishCharacter: "te", kanaCharacter: "て"},
  {id: 20, englishCharacter: "to", kanaCharacter: "と"},
  {id: 21, englishCharacter: "na", kanaCharacter: "な"},
  {id: 22, englishCharacter: "ni", kanaCharacter: "に"},
  {id: 23, englishCharacter: "nu", kanaCharacter: "ぬ"},
  {id: 24, englishCharacter: "ne", kanaCharacter: "ね"},
  {id: 25, englishCharacter: "no", kanaCharacter: "の"},
  {id: 26, englishCharacter: "ha", kanaCharacter: "は"},
  {id: 27, englishCharacter: "hi", kanaCharacter: "ひ"},
  {id: 28, englishCharacter: "fu", kanaCharacter: "ふ"},
  {id: 29, englishCharacter: "he", kanaCharacter: "へ"},
  {id: 30, englishCharacter: "ho", kanaCharacter: "ほ"},
  {id: 31, englishCharacter: "ma", kanaCharacter: "ま"},
  {id: 32, englishCharacter: "mi", kanaCharacter: "み"},
  {id: 33, englishCharacter: "mu", kanaCharacter: "む"},
  {id: 34, englishCharacter: "me", kanaCharacter: "め"},
  {id: 35, englishCharacter: "mo", kanaCharacter: "も"},
  {id: 36, englishCharacter: "ya", kanaCharacter: "や"},
  {id: 37, englishCharacter: "yu", kanaCharacter: "ゆ"},
  {id: 38, englishCharacter: "yo", kanaCharacter: "よ"},
  {id: 39, englishCharacter: "ra", kanaCharacter: "ら"},
  {id: 40, englishCharacter: "ri", kanaCharacter: "り"},
  {id: 41, englishCharacter: "ru", kanaCharacter: "る"},
  {id: 42, englishCharacter: "re", kanaCharacter: "れ"},
  {id: 43, englishCharacter: "ro", kanaCharacter: "ろ"},
  {id: 44, englishCharacter: "wa", kanaCharacter: "わ"},
  {id: 45, englishCharacter: "wo", kanaCharacter: "を"},
  {id: 46, englishCharacter: "n", kanaCharacter: "ん"},
];

const KATAKANA = [
  {id: 1, englishCharacter: "a", kanaCharacter: "ア"},
  {id: 2, englishCharacter: "i", kanaCharacter: "イ"},
  {id: 3, englishCharacter: "u", kanaCharacter: "ウ"},
  {id: 4, englishCharacter: "e", kanaCharacter: "エ"},
  {id: 5, englishCharacter: "o", kanaCharacter: "オ"},
  {id: 6, englishCharacter: "ka", kanaCharacter: "カ"},
  {id: 7, englishCharacter: "ki", kanaCharacter: "キ"},
  {id: 8, englishCharacter: "ku", kanaCharacter: "ク"},
  {id: 9, englishCharacter: "ke", kanaCharacter: "ケ"},
  {id: 10, englishCharacter: "ko", kanaCharacter: "コ"},
  {id: 11, englishCharacter: "sa", kanaCharacter: "サ"},
  {id: 12, englishCharacter: "shi", kanaCharacter: "シ"},
  {id: 13, englishCharacter: "su", kanaCharacter: "ス"},
  {id: 14, englishCharacter: "se", kanaCharacter: "セ"},
  {id: 15, englishCharacter: "so", kanaCharacter: "ソ"},
  {id: 16, englishCharacter: "ta", kanaCharacter: "タ"},
  {id: 17, englishCharacter: "chi", kanaCharacter: "チ"},
  {id: 18, englishCharacter: "tsu", kanaCharacter: "ツ"},
  {id: 19, englishCharacter: "te", kanaCharacter: "テ"},
  {id: 20, englishCharacter: "to", kanaCharacter: "ト"},
  {id: 21, englishCharacter: "na", kanaCharacter: "ナ"},
  {id: 22, englishCharacter: "ni", kanaCharacter: "ニ"},
  {id: 23, englishCharacter: "nu", kanaCharacter: "ヌ"},
  {id: 24, englishCharacter: "ne", kanaCharacter: "ネ"},
  {id: 25, englishCharacter: "no", kanaCharacter: "ノ"},
  {id: 26, englishCharacter: "ha", kanaCharacter: "ハ"},
  {id: 27, englishCharacter: "hi", kanaCharacter: "ヒ"},
  {id: 28, englishCharacter: "fu", kanaCharacter: "フ"},
  {id: 29, englishCharacter: "he", kanaCharacter: "ヘ"},
  {id: 30, englishCharacter: "ho", kanaCharacter: "ホ"},
  {id: 31, englishCharacter: "ma", kanaCharacter: "マ"},
  {id: 32, englishCharacter: "mi", kanaCharacter: "ミ"},
  {id: 33, englishCharacter: "mu", kanaCharacter: "ム"},
  {id: 34, englishCharacter: "me", kanaCharacter: "メ"},
  {id: 35, englishCharacter: "mo", kanaCharacter: "モ"},
  {id: 36, englishCharacter: "ya", kanaCharacter: "ヤ"},
  {id: 37, englishCharacter: "yu", kanaCharacter: "ユ"},
  {id: 38, englishCharacter: "yo", kanaCharacter: "ヨ"},
  {id: 39, englishCharacter: "ra", kanaCharacter: "ラ"},
  {id: 40, englishCharacter: "ri", kanaCharacter: "リ"},
  {id: 41, englishCharacter: "ru", kanaCharacter: "ル"},
  {id: 42, englishCharacter: "re", kanaCharacter: "レ"},
  {id: 43, englishCharacter: "ro", kanaCharacter: "ロ"},
  {id: 44, englishCharacter: "wa", kanaCharacter: "ワ"},
  {id: 45, englishCharacter: "wo", kanaCharacter: "ヲ"},
  {id: 46, englishCharacter: "n", kanaCharacter: "ン"},
];

class KanaEnglishPair extends React.Component {

  constructor () {
    super()
    this.state = {
      location: {}, 
      matched: false
    }
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
    console.log("matched!")
    this.setState({matched: true})
  }

  render() {
    console.log("rendering view for ", this.props.kanaCharacter)
  	const englishChar = this.props.englishChar;
  	const englishCharStyle = englishChar.length > 2 || /^(m|w).$/.test(englishChar) ? 
  		styles.englishCharLong : styles.englishChar;
    const kanaCharacterStyle = this.state.matched ? styles.kanaCharacterMatchedStyle :
      styles.kanaCharacterUnmatchedStyle 
    return <View style={styles.kanaEnglishPairContainer}>
  		<View style={styles.kanaInput} onLayout={this.onLayout} ref={(ref) => {this.view = ref}}>
        <Text style={kanaCharacterStyle}>{this.props.kanaCharacter}</Text>
      </View>
  		<Text style={englishCharStyle}>{this.props.englishChar}</Text>
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
    if (this.state.showDraggable) {
      return <Animated.View
        {...this.panResponder.panHandlers}
        style={panStyle}>
        <Text style={styles.kanaCharacter}>{this.props.kanaCharacter.kanaCharacter}</Text>
      </Animated.View>
    } else {
      return <View style={styles.kanaDraggableMatchedStyle}>
        <Text />
      </View>
    }
  }
}

export default class DragNDropScreen extends React.Component {

  constructor () {
    super()
    this.dropTargets = []
  }
  componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }

  componentWillUnmount () {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  createDraggables () {
    let kana = []
    const kanaSet = this.kanaSet
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
      console.log("drop area HIT!")
      this.dropTargets[kanaCharacter.id].onMatched()
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
    return <KanaEnglishPair key={key} englishChar={english} kanaCharacter={kana} ref={(ref) => {this.dropTargets[key] = ref}}/>
  }

  render() {
    const kanaType = this.props.navigation.getParam('kanaType', 'hiragana');
    this.kanaSet = kanaType == 'hiragana' ? HIRAGANA : KATAKANA;
    return (
      <View style={{
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
      }}>
      	<View style={{
          flex: 7,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
        }}>
          <View style={styles.kanaColumn}>
          	{this.createPairView(44, "wa")}
          	<KanaEnglishPairBlank />
          	{this.createPairView(45, "wo")}
          	<KanaEnglishPairBlank />
          	{this.createPairView(46, "n")}
        	</View>
          <View style={styles.kanaColumn}>
          	{this.createPairView(39, "ra")}
          	{this.createPairView(40, "ri")}
          	{this.createPairView(41, "ru")}
          	{this.createPairView(42, "re")}
          	{this.createPairView(43, "ro")}
        	</View>
          <View style={styles.kanaColumn}>
          	{this.createPairView(36, "ya")}
          	<KanaEnglishPairBlank />
          	{this.createPairView(37, "yu")}
          	<KanaEnglishPairBlank />
          	{this.createPairView(38, "yo")}
        	</View>
          <View style={styles.kanaColumn}>
          	{this.createPairView(31, "ma")}
          	{this.createPairView(32, "mi")}
          	{this.createPairView(33, "mu")}
          	{this.createPairView(34, "me")}
          	{this.createPairView(35, "mo")}
        	</View>
          <View style={styles.kanaColumn}>
            {this.createPairView(26, "ha")}
            {this.createPairView(27, "hi")}
            {this.createPairView(28, "hu")}
            {this.createPairView(29, "he")}
            {this.createPairView(30, "ho")}
          </View>
          <View style={styles.kanaColumn}>
          	{this.createPairView(21, "na")}
          	{this.createPairView(22, "ni")}
          	{this.createPairView(23, "nu")}
          	{this.createPairView(24, "ne")}
          	{this.createPairView(25, "no" )}
        	</View>
          <View style={styles.kanaColumn}>
          	{this.createPairView(16, "ta")}
          	{this.createPairView(17, "chi")}
          	{this.createPairView(18, "tsu")}
          	{this.createPairView(19, "te")}
          	{this.createPairView(20, "to")}
        	</View>
          <View style={styles.kanaColumn}>
          	{this.createPairView(11, "sa")}
          	{this.createPairView(12, "shi")}
          	{this.createPairView(13, "su")}
          	{this.createPairView(14, "se")}
          	{this.createPairView(15, "so")}
        	</View>
          <View style={styles.kanaColumn}>
          	{this.createPairView(6, "ka")}
          	{this.createPairView(7, "ki" )}
          	{this.createPairView(8, "ku" )}
          	{this.createPairView(9, "ke" )}
          	{this.createPairView(10, "ko" )}
        	</View>
          <View style={styles.kanaColumn}>
            {this.createPairView(1, "a")}
            {this.createPairView(2, "i" )}
            {this.createPairView(3, "u" )}
            {this.createPairView(4, "e" )}
            {this.createPairView(5, "o" )}
          </View>
    	</View>
      <View style={{
        flex: 3, 
        flexDirection: 'row', 
        backgroundColor: 'skyblue',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        alignSelf: 'baseline',
        flexWrap: 'wrap',
      }}>
        {this.createDraggables()}
      </View>
    </View>
     );
  }
}

const styles = StyleSheet.create({
	kanaColumn: {
		width: 54, 
		backgroundColor: 'steelblue',
		textAlign: 'right',
	},
  kanaCharacter: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    width: 30,
  },
	englishChar: {
		color: '#fff',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 4,
		textAlign: 'right',
		width: 22,
	},
	englishCharLong: {
		color: '#fff',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 0,
		textAlign: 'right',
		width: 22,
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
    height: 20,
    width: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
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
	}
})
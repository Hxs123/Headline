/**
 * Author: Hector Solis
 * Headline (News Article Summary Android App)
 * Uses Facebook's React Native
 *    https://github.com/facebook/react-native
 *
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

//var EXAMPLE_ARTICLES = {number : "1.", name : "Yolo", url : "www.sweg.org"};
//new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var STATE = {
  MAIN : {value: 0}, 
  ARTICLE: {value: 1},
  SUMMARY: {value: 2}
};
//var currentState = STATE.MAIN;
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var API_URL = 'https://api.aylien.com/api/v1/summarize';
var API_ID = '7358622d';
var API_KEY = 'ef58a20105cbd03d9931df2142752a86';
var SENTENCES = 5;
//var articleUrl = '';
var params = '';//'?url=' + articleUrl + '&sentences=' + SENTENCES;
var requestUrl = '';//API_URL + params;
var requestArticleUrl ='';
var showArticle = true;
var SAMPLE_ARTICLES = ['http://www.independent.co.uk/arts-entertainment/books/reviews/sweet-home-by-carys-bray-book-review-unnerving-tour-de-force-shows-what-the-short-story-can-do-a6891786.html', 'http://www.theverge.com/2016/3/26/11309624/microsoft-hololens-holoportation-star-wars', 'http://www.reuters.com/article/us-microsoft-twitter-bot-idUSKCN0WQ2LA'];

var InputField = React.createClass({
  getInitialState: function() {
    return {
      myState: STATE.MAIN,
      articleUrl: "",
      sampleUrl: "",
      articleText: "",
      summary: "",
      loaded: false,
      title: "",
      author: "",
      date: "",
      image: ""
    };
  },

  fetchArticle() {
    fetch(requestArticleUrl, {
      method: 'GET',
      headers: {
        'X-AYLIEN-TextAPI-Application-Key': API_KEY,
        'X-AYLIEN-TextAPI-Application-ID': API_ID,
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          author: responseData.author,
          image: responseData.image,
          title: responseData.title,
          date: responseData.publishDate
        });
      })
      .done();
  },

  fetchData() {
    fetch(requestUrl, {
      method: 'GET',
      headers: {
        'X-AYLIEN-TextAPI-Application-Key': API_KEY,
        'X-AYLIEN-TextAPI-Application-ID': API_ID,
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          articleText: responseData.text,
          summary: responseData.sentences,
          loaded: true
        });
      })
      .done();
  },

  render: function () {
    if (this.state.myState == STATE.MAIN) {
      return (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headline}>HEADLINE</Text>
          <Text style={styles.prompt}>
            Enter a URL to summarize an article:
          </Text>
          <TextInput 
            style={styles.textInput}
            onChangeText={(articleUrl) => this.setState({articleUrl})}
            onSubmitEditing={this.onPressButton}
          />
          <TouchableHighlight style={styles.button} 
                              onPress={this.onPressButton}>
              <Text style={styles.text}>Submit</Text>
          </TouchableHighlight>
          <Text style={styles.or}>OR</Text>
          <Text style={styles.prompt}>Try out a sample article</Text>
          <TouchableHighlight style={styles.hyperlinkWrap}
                              onPress={() => this.onPressUrl(SAMPLE_ARTICLES[0])}>
              <Text style={styles.hyperlink}>1. {SAMPLE_ARTICLES[0]}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.hyperlinkWrap}
                              onPress={() => this.onPressUrl(SAMPLE_ARTICLES[1])}>
              <Text style={styles.hyperlink}>2. {SAMPLE_ARTICLES[1]}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.hyperlinkWrap}
                              onPress={() => this.onPressUrl(SAMPLE_ARTICLES[2])}>
              <Text style={styles.hyperlink}>3. {SAMPLE_ARTICLES[2]}</Text>
          </TouchableHighlight>
        </ScrollView>
      );
    }
    else if (this.state.myState == STATE.ARTICLE && this.state.loaded) {
      return (
        <ScrollView style={styles.scrollView}>
          <TouchableHighlight style={styles.button}
                              onPress={this.onPressBack}>
            <Text style={styles.text}>Back</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
                              onPress={this.onPressSummary}>
            <Text style={styles.text}>Summary</Text>
          </TouchableHighlight>
          <Text style={styles.prompt}>Article</Text>
          <View style={styles.paddingView}>
            <Text style={styles.info}>Title: {this.state.title}</Text>
            <Text style={styles.info}>Author: {this.state.author}</Text>
            <Text style={styles.info}>Date: {this.state.date}</Text>
            <Text style={styles.readingText}>{this.state.articleText}</Text>
          </View>
        </ScrollView>
      );
    }
    else if (this.state.myState == STATE.SUMMARY) {
      return (
        <ScrollView style={styles.scrollView}>
          <TouchableHighlight style={styles.button}
                              onPress={this.onPressArticle}>
              <Text style={styles.text}>Article</Text>
          </TouchableHighlight>
          <Text style={styles.prompt}>Summary</Text>
          <View style={styles.paddingView}>
            <Text style={styles.readingText}>{this.state.summary}</Text>
          </View>
        </ScrollView>
      );
    }
    else if (!this.state.loaded) {
      return this.renderLoadingView();
    }
  },

  onPressArticle: function() {
    this.setState({myState: STATE.ARTICLE});
  },

  onPressButton: function() {
    this.validateUrl();
    requestArticleUrl = 'https://api.aylien.com/api/v1/extract?url=' + this.state.articleUrl;
    this.fetchArticle();
    this.refreshParams();
    this.fetchData(); 
    this.setState({myState: STATE.ARTICLE});
  },

  onPressBack: function() {
    this.setState({myState: STATE.MAIN,
                   loaded: false
    });
  },

  onPressSummary: function() {
    this.setState({myState: STATE.SUMMARY});
  },

  onPressUrl: function(url){
    this.setState({sampleUrl: url});
    requestArticleUrl = 'https://api.aylien.com/api/v1/extract?url=' + this.state.sampleUrl;
    this.fetchArticle();
    params = '?url=' + this.state.sampleUrl + '&sentences=' + SENTENCES;
    requestUrl = API_URL + params;
    this.fetchData();
    this.setState({myState: STATE.ARTICLE});
  },

  refreshParams: function() {
    params = '?url=' + this.state.articleUrl + '&sentences=' + SENTENCES;
    requestUrl = API_URL + params;
  },

  renderLoadingView: function() {
    return(
      <View style={styles.backgroundContainer}>
        <Text style={styles.prompt}>
          Loading article & summary...
        </Text>
      </View>
      );
  },

  validateUrl: function(){
    if (this.state.articleUrl.indexOf('http') != 0) {
      var newUrl = 'http://' + this.state.articleUrl;
      this.setState({articleUrl: newUrl});
    }
  }
});

var ArticleView = React.createClass
class Headline extends Component {
  render() {
    return (
      <View style={styles.backgroundContainer}>
        <InputField />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#000066',
    opacity: 0.88,
    margin: 0,
  },
  button: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: windowSize.width,
    marginTop: 10,
    padding: 5,
    opacity: 0.9
  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#F5FCFF',

  },
  headline: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 40,
    color: '#00FF00',
  },
  hyperlink: {
    color: '#FFFFFF',
    // Only available for ios, darn
    textDecorationLine: 'underline',
    paddingTop: 20,
  },
  hyperlinkWrap: {
    padding: 5
  },
  inputField: {
     paddingTop: 20
  },
  info: {
    fontSize: 15,
    margin: 10,
    color: '#00FF00',
  },
  prompt: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#00FF00',
  },
  paddingView: {
    padding: 10,
  },
  readingText: {
    textAlign: 'left',
    color: '#FFFFFF',
  },
  or: {
    textAlign: 'center',
    fontSize: 40,
    color: '#00FF00',
  },
  scrollView: {
    paddingBottom: 10,
  },
  text: {
    textAlign: 'center',
    color: '#00FF00',
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 10,
    color: '#FFFFFF',
  }
});

AppRegistry.registerComponent('Headline', () => Headline);
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
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

//var EXAMPLE_ARTICLES = {number : "1.", name : "Yolo", url : "www.sweg.org"};
//new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


var API_URL = 'https://api.aylien.com/api/v1/summarize';
var API_ID = '7358622d';
var API_KEY = 'ef58a20105cbd03d9931df2142752a86';
var SENTENCES = 5;
var articleUrl = '';
var params = '?url=' + articleUrl + '&sentences=' + SENTENCES;
var requestUrl = API_URL + params;
var showArticle = false;

var InputField = React.createClass({
  getInitialState: function() {
    return {
      text: "",
      test: ""  
    };
  },

  render: function () {
    return (
      <View style={styles.inputField}>
        <Text style={styles.prompt}>
          Enter a URL to summarize an article:
        </Text>
        <TextInput 
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this.onPressButton}
          //value={this.state.text}
        />
        <TouchableHighlight onPress={this.onPressButton}>
            <View style={styles.button}>
              <Text style={styles.text}>Submit</Text>
            </View>
          </TouchableHighlight>
          {/* This line down here is for debugging purposes */}
          <Text>{this.state.text}</Text>
          <Text>{this.state.test}</Text>
      </View>
    );
  },

  onPressButton: function() {
    articleUrl = this.state.text;
    this.setState({test : requestUrl});
    //Do something that will send a request to the server
    this.refreshParams();
    //this.replaceAllSlashes();
  },

  refreshParams: function() {
    params = '?url=' + articleUrl + '&sentences=' + SENTENCES;
    requestUrl = API_URL + params;
  }

/*   replaceAllSlashes: function() {
    var str = this.state.text;
    str.replace(new RegExp('//', 'g'), '%2F');
    str.replace(new RegExp(':', 'g', '%3A'));
    this.setState({text : str});
  } */
});

var SampleArticles = React.createClass({
  getInitialState: function() {
    return {
      sampleUrl: "",
      articleText: "",
      summary: ""
    };
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
          summary: responseData.sentences
        });
      })
      .done();
  },

  render: function () {
    return (
      <ScrollView style={styles.samples}>
        <TouchableHighlight onPress={() => this.onPressUrl('http://www.independent.co.uk/arts-entertainment/books/reviews/sweet-home-by-carys-bray-book-review-unnerving-tour-de-force-shows-what-the-short-story-can-do-a6891786.html')}>
              <View style={styles.rightContainer}>
                {/*<Text style={styles.number}>1.</Text>*/}
                <Text style={styles.hyperlink}>1. www.sweg.com</Text>
              </View>
          </TouchableHighlight>
          <Text>{this.state.articleText}</Text>
          <Text>-------------------------</Text>
          <Text>{this.state.summary}</Text>
      </ScrollView>
    );
  },

  onPressUrl: function(url){
    this.setState({sampleUrl: url});
    params = '?url=' + this.state.sampleUrl + '&sentences=' + SENTENCES;
    requestUrl = API_URL + params;
    this.fetchData();
  }

});

var ArticleView = React.createClass
class Headline extends Component {
  render() {
    return (
      <View style={styles.container}>
        <InputField />
        <Text style={styles.or}>OR</Text>
        <Text style={styles.prompt}>Try out a sample article</Text>
        <SampleArticles />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00802b',

  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#F5FCFF',

  },
  hyperlink: {

  },
  inputField: {
     paddingTop: 20
  },
  prompt: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  number: {
    
  },
  or: {
    textAlign: 'center',
    fontSize: 40,
  },
  rightContainer: {
    flex: 1
  },
  text: {
    textAlign: 'center',
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  }
});

AppRegistry.registerComponent('Headline', () => Headline);
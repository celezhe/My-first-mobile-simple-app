import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, CameraRoll} from 'react-native';

export default class App extends React.Component {
  state = {
     imgUri: 'https://imgflip.com/s/meme/Philosoraptor.jpg',
     topText: 'initial photo',
     bottomText: 'change the word',
   }
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={(text) => this.setState({topText: text})}
        />
        <TextInput style={styles.input} onChangeText={(text) => this.setState({bottomText: text})}
        />
        <Text>Welcome to University of Michigan</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style = {styles.button} onPress={this._onTakePic}>
            <Text style={styles.buttonText}>take a picture!</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.button} onPress={this._onSave}>
            <Text style = {styles.buttonText}>save</Text>
          </TouchableOpacity>
        </View>
        <View ref={(ref) => this.memeView = ref}>
           <Image
            style = {{ width: 300, height: 300 }}
            source={{ uri: this.state.imgUri }}
            />
            <Text style = {[styles.text, {top: 5}]}>
              {this.state.topText}
            </Text>
            <Text style = {[styles.text, {bottom: 5}]}>
              {this.state.bottomText}
            </Text>
        </View>

      </View>
    );
  }
  _onTakePic = async () => {
       const {
         cancelled,
         uri,
       } = await Expo.ImagePicker.launchCameraAsync({});
       if (!cancelled) {
         this.setState({ imgUri: uri });
       }
  }
  _onSave = async () => {
    const uri = await Expo.takeSnapshotAsync(this.memeView, {});
    await CameraRoll.saveToCameraRoll(uri);
  }
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth:1,
    margin:5,
    padding: 5,
    alignSelf: 'stretch',
  },
  text: {
    position: 'absolute',
    left: 5, right: 5,
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 5,
    margin: 5,
    backgroundColor: '#ddd',
  },
});

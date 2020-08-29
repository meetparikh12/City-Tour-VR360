import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Image,
  asset,
  NativeModules,
  Environment,
} from 'react-360';
import locations from './consts/locations';
import BabyBoy from './entities/Babyboy';

const SurfaceModule = NativeModules.SurfaceModule;
const TransitionModule = NativeModules.TransitionModule;
const {AudioModule} = NativeModules;
class LocationPanel extends React.Component {
  state = {
    img: {
      name: 'front.png',
      width: this.props.width ? this.props.width: 100,
      height: this.props.height ? this.props.height: 100
    }
  }

  changeLocation(location){
      SurfaceModule.setTooltipsForThumbnail(location);
      Environment.setBackgroundImage(asset(`${locations[`${location}`].img}`));
      TransitionModule.setTooltipsForTransition(location);    
  }

  render() {
    return (
      <View>
        <VrButton onClick={()=>this.changeLocation(this.props.goesTo)}>
        <Image source={asset(`${this.state.img.name}`)} style={{width: this.state.img.width, height: this.state.img.height}}/>
        </VrButton>
        {/* {this.state.mouseOn ? <View style={styles.attractionBox}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View> : null} */}
      </View>
    )
  }
}


class InfoPanel extends React.Component {
  state = {
    img: {
      name: 'question.png',
      width: this.props.width ? this.props.width: 100,
      height: this.props.height ? this.props.height: 100
    },
    mouseOn: false
  }
  transformDisplay(index){
    this._changeSurfaceDimensions(300,300,index)
    this.setState({
      img: {
      name: `attractions/${this.props.infoImg}`,
      width: 300,
      height: 200
      },
      mouseOn: true
    })
  }
  resetPanel(index){
    this._changeSurfaceDimensions(100, 100, index)
    this.setState({
      img: {
        name: `question.png`,
        width: this.props.width,
        height: this.props.height
      },
      mouseOn: false
    })
  }
  _changeSurfaceDimensions(width,height,index){
    SurfaceModule.resizeSurface(width,height,index);
  }
  render() {
    return (
      <View hitSlop={160} onEnter={()=>this.transformDisplay(this.props.index)} 
            onExit={()=> this.resetPanel(this.props.index)} >
        <Image source={asset(`${this.state.img.name}`)} style={{width: this.state.img.width, height: this.state.img.height}}/>
        {this.state.mouseOn ? <View style={styles.attractionBox}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View> : null}
      </View>
    )
  }
}

export default class TourismAppVR extends React.Component {
  
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     img: {
  //       name: ''
  //     }  
  //   }
  // }
  // updateCounter() {
  //   this.setState({counter: this.state.counter + 1})
  // }
  // componentDidMount(){
  //   setInterval(this.updateCounter.bind(this),1000);
  // }
  startTour(){
    AudioModule.playOneShot({
      source: asset('travel-tour.mp3'),
      volume: 0.3
    })
    TransitionModule.setTooltipsForTransition('CityCenter');
    SurfaceModule.setTooltipsForThumbnail('CityCenter');
  }

  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <VrButton onClick={() => this.startTour()}>
            <Text style={styles.greeting}>
                Welcome, Let's have a tour of the city!
            </Text>
          </VrButton>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 500,
    height: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
  attractionBox: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#FFFFFF',
    width: 300,
    maxHeight: 100,
  },
  text: {
    fontSize: 24,
    color: '#000000'
    }
});

AppRegistry.registerComponent('TourismAppVR', () => TourismAppVR);
AppRegistry.registerComponent('InfoPanel', ()=> InfoPanel);
AppRegistry.registerComponent('LocationPanel', () => LocationPanel);
AppRegistry.registerComponent('BabyBoy', ()=> BabyBoy);
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * @author XU Kai(xukai@meituan.com)
 * 
 */

'use strict';

import React, {
  Component
} from 'react';

import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image
} from 'react-native';

import conf from './conf';

import Button from 'apsl-react-native-button';
import io from 'socket.io-client';
import TouchableHighlight from 'TouchableHighlight';
import Toast from 'react-native-root-toast';


const IO_SERVER = `http://${conf.ip}:${conf.port}`;

let styles = StyleSheet.create({
  image: {
    height: 94,
    width: 94
  }
});

let socket;
class Client extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isCarOnline: false
    };
  }

  PressInAction(direction) {
    Toast.show(direction, {
      shadow: false,
      animation: false,
      hideOnPress: true
    });
    socket.emit('directives', direction)
  }

  PressOutAction(direction) {
    Toast.show(direction, {
      shadow: false,
      animation: false,
      hideOnPress: true
    });    
    socket.emit('directives', direction)
  }

  componentDidMount() {
    socket = io.connect(IO_SERVER, {
      query: `specify=SIGNAL`
    });

    let self = this;
    socket.on('car status', (isOnline) => {
      self.setState({
        isCarOnline: isOnline
      });
    });

    /*
    socket.on('connect', () => {

    });
    socket.on('disconnect', () => {

    });
    */
  }

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar hidden={true} />
        <View style={{marginTop:10,padding:5,backgroundColor:'yellow'}}>
          <Text style={{color:'red'}}> 树莓派手机（ Android）远程控制器 </Text> 
        </View>
        
        <View style={{padding:8,flexDirection:'row',paddingBottom:0,alignItems:'center'}}>
          <Text>小车状态：</Text>
          <View style={{height:15,width:15,backgroundColor:this.state.isCarOnline?'green':'red'}}></View>
        </View>
        <View style={{paddingLeft:5,paddingRight:5,marginTop:10,marginBottom:200,flex:1,flexDirection:'row',justifyContent:'space-around'}}>
          <View>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <TouchableHighlight onPressIn={this.PressInAction.bind(this, 'lti')} onPressOut={this.PressOutAction.bind(this, 'lto')} style={styles.image}>
                <Image source={require('./images/cjk.jpg')} style={styles.image} />
              </TouchableHighlight>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <TouchableHighlight onPressIn={this.PressInAction.bind(this, 'lli')} onPressOut={this.PressOutAction.bind(this, 'llo')} style={[styles.image, {marginRight:47}]}>
                <Image source={require('./images/lzll.jpg')} style={styles.image} />
              </TouchableHighlight>
              <TouchableHighlight onPressIn={this.PressInAction.bind(this, 'lri')} onPressOut={this.PressOutAction.bind(this, 'lro')} style={[styles.image, {marginLeft:47}]}>
                <Image source={require('./images/sdf.jpg')} style={styles.image} />
              </TouchableHighlight>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <TouchableHighlight onPressIn={this.PressInAction.bind(this, 'lbi')} onPressOut={this.PressOutAction.bind(this, 'lbo')} style={styles.image}>
                <Image source={require('./images/xz.jpg')} style={styles.image} />
              </TouchableHighlight>
            </View>
          </View>
          <View>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <TouchableHighlight onPressIn={this.PressInAction.bind(this, 'rti')} onPressOut={this.PressOutAction.bind(this, 'rto')} style={styles.image}>
                <Image source={require('./images/cjk.jpg')} style={styles.image} />
              </TouchableHighlight>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <TouchableHighlight onPressIn={this.PressInAction.bind(this, 'rli')} onPressOut={this.PressOutAction.bind(this, 'rlo')} style={[styles.image, {marginRight:47}]}>
                <Image source={require('./images/lzll.jpg')} style={styles.image} />
              </TouchableHighlight>
              <TouchableHighlight onPressIn={this.PressInAction.bind(this, 'rri')} onPressOut={this.PressOutAction.bind(this, 'rro')} style={[styles.image, {marginLeft:47}]}>
                <Image source={require('./images/sdf.jpg')} style={styles.image} />
              </TouchableHighlight>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <TouchableHighlight onPressIn={this.PressInAction.bind(this, 'rbi')} onPressOut={this.PressOutAction.bind(this, 'rbo')} style={styles.image}>
                <Image source={require('./images/xz.jpg')} style={styles.image} />
              </TouchableHighlight>
            </View>
          </View>
        </View> 
      </View>
    );
  }
}

export default Client;

import React, { Component } from 'react';
import { StyleSheet, Text, Platform, TextInput, FlatList, View, KeyboardAvoidingView } from 'react-native';
import Itemmessage from "../../../../../Components/Itemmessage"
import Icon from "react-native-vector-icons/Ionicons";
import Ioicon from "react-native-vector-icons/Ionicons"

import { Colors } from '../../../../../Theme'
import styles from "./styles"
import I18n from '../../../../../I18n/I18n'
import Button from '../../../../../Components/Controls/Button'

const IS_IOS = Platform.OS === 'ios'
let iconType = IS_IOS ? 'ios' : 'md'
import LinearGradient from 'react-native-linear-gradient'
export default class ChatView extends Component {
  constructor(props) {
    super(props);
    this.handleSendMessage = this.onSendMessage.bind(this);
  }

  onSendMessage(e) {
    this.props.onSendMessage(e.nativeEvent.text);
    this.refs.input.clear();

  }
  renderHeader = () => {


    return (
      <View style={{ elevation: 11 }}>
        {this.renderBackButton()}
        <Text style={styles.title}>{this.props.user_name} </Text>
      </View>
    )
  }

  renderGradient = () => (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[Colors.rouge, Colors.brick]}
      style={styles.gradientHeader}
    />
  )
  renderBackButton = () => {
    return (
      <Button
        onPress={() =>
          this.props.navigation.goBack()

        }
        iconSettings={{
          iconName: `${iconType}-arrow-back`,
          iconSize: 25,
          iconTintColor: Colors.basic.white,
          iconStyle: styles.backButtonIcon
        }}
        type='transparent'
        buttonColor={Colors.jungleGreen}
        containerStyle={styles.backButton}
      />
    )
  }


  render() {

    return (

      <View style={styles.content}>
        {/* {this.renderGradient()} */}
        {/* {this.renderHeader()}  */}
        <View style={styles.content2}>

          <FlatList
            style={styles.messages}
            data={this.props.messages}
            // initialScrollIndex={this.props.messages.length - 1}
            inverted
            //  <FlatList data={ this.props.list } 
            renderItem={({ item }) => (

              <Itemmessage 
              id={this.props.id}
              data={item} />

            )}

          />
          {/* <KeyboardAvoidingView style={styles.container} behavior="padding"> */}
          <View style={styles.inputContainer}>
          <Ioicon 
         style={[{ transform: [{ rotate: "180deg"}]},{margin:10}]}
         name="md-send" size={30} color="#f6f6f6" />
          <TextInput
            keyboardType="default"
            returnKeyType="done"
            enablesReturnKeyAutomatically
            style={styles.input}
            blurOnSubmit={false}
            onSubmitEditing={this.handleSendMessage}
            ref="input"
            placeholder="اكتب رساله"
          />
          </View>

          {/* </KeyboardAvoidingView>  */}
        </View>

      </View>
    );
  }

  renderItem({ item }) {
    const action = item.action;
    const name = item.name;



    return <Text>{name}: {item.message}</Text>;

  }
}


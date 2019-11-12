import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Alert, Text } from 'react-native'

import Video from 'react-native-af-video-player'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class ReactNavigationExample extends Component {

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    // Setup the header and tabBarVisible status
    const header = state.params && (state.params.fullscreen ? undefined : null)
    const tabBarVisible = state.params ? state.params.fullscreen : true
    return {
      // For stack navigators, you can hide the header bar like so
      header,
      // For the tab navigators, you can hide the tab bar like so
      tabBarVisible,
    }
  }

  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status
    })
  }

  onMorePress() {
    Alert.alert(
      'Boom',
      'This is an action call!',
      [{ text: 'Aw yeah!' }]
    )
  }

  render() {

    const url = 'https://www.youtube.com/watch?v=vApNev_EWy0'
    const title = 'My video title'

    return (
      <View style={styles.container}>
        <Video
          autoPlay
          url={url}
          title={title}
          onMorePress={() => this.onMorePress()}
          onFullScreen={status => this.onFullScreen(status)}
          fullScreenOnly
        />
        <ScrollView>
          <Text>Some content here...</Text>
        </ScrollView>
      </View>
    )
  }
}

export default ReactNavigationExample
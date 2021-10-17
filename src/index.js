import React from 'react'
import { ScrollView, StatusBar, View, Text, TouchableOpacity, Linking, Modal, Dimensions } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import Icon from 'react-native-vector-icons/Ionicons'
import { WebView } from 'react-native-webview'
import QRCodeScanner from 'react-native-qrcode-scanner'
import Toast from 'react-native-simple-toast'
const modalDimension = [Dimensions.get('screen').width * .85, Dimensions.get('screen').height * .85, Dimensions.get('screen').width * .15]

export default class scanner extends React.Component {

  inBrowser = (url) => {
    if (this.state.useScan) {
      if ((url[0] + url[1] + url[2] + url[3] + url[4]) === 'https' || (url[0] + url[1] + url[2] + url[3] + url[4]) === 'HTTPS') {
        url = url.replace(/https/i, 'http')
      }
      else if ((url[0] + url[1] + url[2] + url[3]) != 'http') {
        url = `http://${url}`
      }
      Linking.openURL(url)
    }
    else {
      Toast.show('Use scan before', Toast.LONG)
    }
  }

  inClipboard = () => {
    if (this.state.useScan) {
      Clipboard.setString(this.state.scannedString)
      Toast.show('Copied to clipboard', Toast.LONG)
    }
    else {
      Toast.show('Use scan before', Toast.LONG)
    }
  }

  inApp = () => {
    if (this.state.useScan) {
      this.setState({ webViewVisibility: true })
    }
    else {
      Toast.show('Use scan before', Toast.LONG)
    }
  }

  state = {
    scannedString: 'Hello :) 📷',
    webViewVisibility: false,
    useScan: false
  }

  onSuccess = (e) => {
    this.setState({ scannedString: e.data, useScan: true })
  }

  render() {
    return (
      <View style={{ backgroundColor: 'snow', heigth: '100%', flex: 1, width: '100%', padding: 10 }}>
        <ScrollView >
          <StatusBar hidden />
          <View style={{ backgroundColor: 'white', width: '98%', marginRigth: 'auto', marginLeft: 'auto', marginVertical: 40, borderRadius: 10, paddingHorizontal: 10, borderWidth: 0.5, borderColor: 'rgba(0,0,0,.2)' }}>
            <View style={{ marginVertical: 20, transform: [{ rotate: '90deg' }] }}>
              <QRCodeScanner
                reactivate={true}
                onRead={this.onSuccess}
                showMarker={true}
                checkAndroid6Permissions={true}
                cameraStyle={{ aspectRatio: 1, borderWidth: 5, borderColor: 'blue', borderRadius: 10, overflow: 'hidden', width: '98%', justifyContent: 'center', alignItems: 'center', marginRight: 'auto', marginLeft: 'auto' }}
              />
            </View>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, }} />
            <Text style={{ color: 'rgba(0,0,0,.6)', textAlign: 'center', fontSize: 20, fontFamily: 'FaunaOne', margin: 5 }}>
              {'Scan Result \n'}
              {this.state.scannedString}
            </Text>
            <TouchableOpacity onPress={() => this.inBrowser(this.state.scannedString)}>
              <View style={{ backgroundColor: 'orange', borderRadius: 8, padding: 5, margin: 10, height: 50, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'FaunaOne' }}>
                  Open in Browser
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.inApp()}>
              <View style={{ backgroundColor: 'green', borderRadius: 8, padding: 5, margin: 10, height: 50, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'FaunaOne' }}>
                  Open in App
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.inClipboard()}>
              <View style={{ backgroundColor: 'blue', borderRadius: 8, padding: 5, margin: 10, height: 50, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'FaunaOne' }}>
                  Copy to Clipboard
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Modal animationType="slide" transparent={true} visible={this.state.webViewVisibility}>
            <ScrollView style={{ flex: 1, width: '100%', heigth: '100%', backgroundColor: 'rgba(0, 0, 0, .75)' }}>
              <View style={styles.WebViewContainer}>
                <View style={{ marginLeft: 'auto', marginRight: 25, marginTop: 10 }}>
                  <Icon name={'ios-exit-outline'} size={40} onPress={() => this.setState({ webViewVisibility: false })} />
                </View>
                <View style={{
                  overflow: 'hidden',
                  height: modalDimension[1] * .95,
                  width: modalDimension[0] * .95,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: 'auto',
                  marginTop: 'auto',
                  borderRadius: 10
                }}>
                  <WebView source={{ uri: this.state.scannedString }}

                    scrollEnabled
                  />
                </View>
              </View>
            </ScrollView>
          </Modal>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  WebViewContainer: {
    marginTop: 20,
    height: Dimensions.get('screen').height * .92,
    width: modalDimension[0],
    backgroundColor: 'ghostwhite',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
    justifyContent: 'center',
    marginRigth: modalDimension[2] / 2,
    marginLeft: modalDimension[2] / 2,
  },
}
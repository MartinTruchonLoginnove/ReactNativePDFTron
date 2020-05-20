import React from 'react';
import {Platform, View, PermissionsAndroid, Text} from 'react-native';
import {DocumentView, RNPdftron} from 'react-native-pdftron';

class PDFTronView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      permissionGranted: Platform.OS === 'ios' ? true : false,
    };

    RNPdftron.initialize('Insert commercial license key here after purchase');
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.requestStoragePermission();
    }
  }

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          permissionGranted: true,
        });
      } else {
        this.setState({
          permissionGranted: false,
        });
      }
    } catch (err) {}
  }

  render() {
    if (this.props.accessToken) {
      return (
        <DocumentView
          document="https://stage.viridem.ca/api/v1/companies/36/documentAnchors/1/file"
          customHeaders={{Authorization: `Bearer ${this.props.accessToken}`}}
        />
      );
    }

    return (
      <View>
        <Text>Loading Access Token</Text>
      </View>
    );
  }
}

export default PDFTronView;

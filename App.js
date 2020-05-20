/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import PDFTronView from './PDFTronView';

const username = 'pdftron@loginnove.ca';
const password = '12345678';
const clientId = 2;
const clientSecret = 'mm4hUMPduF4FdHXn6qYqBq03rNkCUUNdotscjtQ7';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: '',
    };
  }
  componentDidMount() {
    fetch('https://stage.viridem.ca/api/oauth/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        username,
        password,
      }),
    })
      .then(async response => {
        const json = await response.json();
        console.log(json);
        this.setState(prevState => ({
          ...prevState,
          accessToken: json.access_token,
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <PDFTronView accessToken={this.state.accessToken} />;
  }
}

export default App;

import React, {Component} from 'react'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from '@firebase/app'
import ReduxThunk from 'redux-thunk'
import {FB_API_KEY, FB_AUTH_DOMAIN,
  FB_DB_URL, FB_PROJ_ID, FB_STORAGE_BUCKET, 
  FB_SENDER_ID} from 'react-native-dotenv'
import Router from './Router'
import reducers from './reducers'

class App extends Component {
  
  componentWillMount() {
    const config = {
      apiKey: FB_API_KEY,
      authDomain: FB_AUTH_DOMAIN,
      databaseURL: FB_DB_URL,
      projectId: FB_PROJ_ID,
      storageBucket: FB_STORAGE_BUCKET,
      messagingSenderId: FB_SENDER_ID
    }

    firebase.initializeApp(config)
  }
  
render() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App
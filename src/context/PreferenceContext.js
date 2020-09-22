import React, {createContext, useState, useEffect} from 'react';
import api from '../api_manager';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import _set from '@babel/runtime/helpers/esm/set';


const PreferenceContext = createContext();
const { Provider } = PreferenceContext;

const PreferenceContextProvider = (props) => {
  const [location, _setLocation] = useState({
    longitude: 129.1131945, latitude: 35.1455593, latitudeDelta: 0.005, longitudeDelta: 0.005, address: '',
  });
  const [holdingPage, _setHoldingPage] = useState(null);

  useEffect(()=>{
    // AsyncStorage.removeItem('location')
  }, []);

  const setLocation = async (newLocation) => {
    let {latitude, longitude} = newLocation;
    let loc = {latitude, longitude};
    if(newLocation.address){loc.address = newLocation.address}
    let combined = Object.assign({}, location, loc);
    _setLocation(combined);
  };

  const setHoldingPage = (page) => {
    _setHoldingPage(page);
  };

  const state = {location, holdingPage};
  const actions = {setLocation, setHoldingPage};

  return (
      <Provider value={{...state, ...actions }}>
        {props.children}
      </Provider>
  )
};

const withPreferenceContext = ChildComponent => props => (
    <PreferenceContext.Consumer>
      {
        context => <ChildComponent {...props} preference={context}  />
      }
    </PreferenceContext.Consumer>
);

export {
  PreferenceContext,
  PreferenceContextProvider,
  withPreferenceContext,
};

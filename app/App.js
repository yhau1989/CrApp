import React from 'react';
import NavigationService from './components/NavigationService';
import Router from "./components/Router";

export default function App() {
  return (
    <Router ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} />
  );
}


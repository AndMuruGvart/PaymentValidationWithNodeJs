
import 'styles/index.scss';

import React from 'react';
import { Container } from 'react-bootstrap';
import { RestfulProvider } from "restful-react";

const App = ({Component, pageProps}) => {
  const isHome = Component.name === 'Home';
  const Wrapper = Component.name === 'PortfolioDetail' ? React.Fragment : Container;
  return (
    <div className="portfolio-app">
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </div>
  )
}

export default ({...props}) =>
  <RestfulProvider base="http://localhost:3001/api">
    <App {...props}/>
  </RestfulProvider>;

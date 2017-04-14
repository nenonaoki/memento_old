// @flow
import React from 'react';
import Helmet from 'react-helmet';
import Header from '../../organisms/header';
import Footer from '../../organisms/footer';
import Notification from '../../organisms/notification';

type Props = {
  children: any,
  location: Object,
};

const App = (props: Props) => (
  <div id="wrapper">
    <Helmet
      defaultTitle="Memento"
      titleTemplate="%s | Memento"
      meta={[
        { name: 'description', content: 'Helmet application' },
        { property: 'og:type', content: 'article' },
      ]}
    />
    <div id="page-wrapper" className="gray-bg no-padding">
      <Header
        location={props.location}
      />
      {props.children}
      <Footer />
    </div>
    <Notification />
  </div>
);

export default App;

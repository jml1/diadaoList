import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from '../src/store';
import Layout from '../src/layout';
import { Container as SemanticContainer } from 'semantic-ui-react';
//import 'semantic-ui-css/semantic.min.css';


class MyApp extends App {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    } 

    return pageProps;
  }


  render() {
    const { Component, pageProps, store, reqUrl} = this.props;
    
    return (
      <Container>
        <Head>
          <title>Diadao TodoList</title>
          <meta name="description" content="New Diadao TodoList project" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
        </Head>
        <Provider store={store}>
          <Layout>
            <SemanticContainer>
              <h1 className={"mainTitle"}>Liste de tâches Diadao</h1>
              <div className={"ui segment"}>
                <Component {...pageProps} />
              </div>
            </SemanticContainer>
          </Layout>
        </Provider>
        <style jsx>{`
          .ui.segment{
            min-height: 100%;
          }
          .mainTitle{
            margin: 20px 0px;
            text-align:center;
          }
        `}</style>
      </Container>
    );
  }
}

export default withRedux(store)(MyApp);
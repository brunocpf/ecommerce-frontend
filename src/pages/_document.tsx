import Document, { Html, Head, Main, NextScript } from 'next/document';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en'; // locale-data for en
import '@formatjs/intl-numberformat/locale-data/pt'; // locale-data for pt

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" href="/favicon-16-16.png" />
          <link rel="icon" href="/favicon-16-16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#8b5cf6" />
        </Head>
        <body className="bg-fixed bg-gray-200 bg text-indigo-900">
          <Main />
          <NextScript />
        </body>
        <style jsx>
          {`
            .bg {
              background: linear-gradient(45deg, #e4e4e7 70%, #1c58da 70%);
              background-size: cover;
              background-attachment: fixed;
            }
          `}
        </style>
      </Html>
    );
  }
}

export default MyDocument;

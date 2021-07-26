import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext
  } from 'next/document'
  import { ServerStyleSheet } from 'styled-components'
  import { ServerStyleSheets } from '@material-ui/core';

  export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const sheet = new ServerStyleSheet()
      const materialSheets = new ServerStyleSheets();
      const originalRenderPage = ctx.renderPage

      try {
        ctx.renderPage = () =>
          originalRenderPage({
            enhanceApp: (App) => (props) =>
              sheet.collectStyles(materialSheets.collect(<App {...props} />))
          })

        const initialProps = await Document.getInitialProps(ctx)
        return {
          ...initialProps,
          styles: (
            <>
              {initialProps.styles}
              {materialSheets.getStyleElement()}
              {sheet.getStyleElement()}
            </>
          )
        }
      } finally {
        sheet.seal()
      }
    }

    render() {
      return (
        <Html lang="pt-BR">
          <Head />
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }

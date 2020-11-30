import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
    static getInitialProps(ctx) {
        return NextDocument.getInitialProps(ctx);
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <ColorModeScript initialColorMode="dark" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

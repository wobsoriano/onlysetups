import { ChakraProvider } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import Head from '../components/Head';
import theme from '../styles/theme';

export default function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Head
                title="OnlySetups"
                description="Easily view workstations and gaming setups from reddit"
            />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object
};

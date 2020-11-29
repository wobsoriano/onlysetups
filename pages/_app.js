import { ChakraProvider } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import theme from '../styles/theme';

export default function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object
};

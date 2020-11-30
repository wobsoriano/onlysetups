import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
        global: {
            html: {
                scrollBehavior: 'smooth'
            }
        }
    }
});

export default theme;

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    useSystemColorMode: true,
    initialColorMode: 'dark',
    styles: {
        global: {
            'html': {
                scrollBehavior: 'smooth'
            }
        }
    }
})

export default theme;
import { Box, Container, Text, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Header(props) {
    const { colorMode, toggleColorMode } = useColorMode()

    const themeIcon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;

    return (
        <Box {...props}>
            <Container maxW="xl" py={3} display="flex" justifyContent="space-between" alignItems="center">
                <Text fontSize="xl" fontWeight="semibold">OnlySetups</Text>
                <IconButton onClick={toggleColorMode} variant="ghost" aria-label="Toggle theme" icon={themeIcon} />
            </Container>
        </Box>
    )
}
import { Box, Container } from "@chakra-ui/react";
import Header from './Header';

export default function Layout({ children }) {
    return (
        <Box minHeight="100vh" display="flex" flexDir="column">
            <Header mb={8} />
            <Container maxW="xl" mb={5}>
                {children}
            </Container>
        </Box>
    )
}
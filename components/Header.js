import { Box, Container, Button, IconButton, useColorMode, Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon } from '@chakra-ui/icons';
import { FilterIcon, LightBulbIcon } from '../styles/icons';

export default function Header({ filter, setFilter, ...props }) {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("white", "gray.800")
    const themeIcon = colorMode === 'light' ? <MoonIcon /> : <LightBulbIcon />;

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <Box {...props} position="fixed" w="100%" zIndex={1} backgroundColor={bgColor}>
            <Container maxW="xl" py={3} display="flex" justifyContent="space-between" alignItems="center">
                <Button variant="ghost" fontSize="xl" onClick={scrollToTop}>OnlySetups</Button>
                <Box>
                    <Menu>
                        <MenuButton as={IconButton} variant="ghost" aria-label="Toggle theme" icon={<FilterIcon />} />
                        <MenuList>
                            <MenuOptionGroup title="Filter" defaultValue={filter} type="radio" onChange={setFilter}>
                                <MenuItemOption value="hot">Hot</MenuItemOption>
                                <MenuItemOption value="new">New</MenuItemOption>
                                <MenuItemOption value="top">Top</MenuItemOption>
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>
                    <IconButton ml={1} onClick={toggleColorMode} variant="ghost" aria-label="Toggle theme" icon={themeIcon} />
                </Box>
            </Container>
        </Box>
    )
}
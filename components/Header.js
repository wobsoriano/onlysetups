import { Box, Container, Button, IconButton, useColorMode, Menu, MenuButton, MenuList, MenuGroup, MenuItem } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FilterIcon, FireIcon, ChartBarIcon, LightBulbIcon } from '../styles/icons';

export default function Header(props) {
    const { colorMode, toggleColorMode } = useColorMode()

    const themeIcon = colorMode === 'light' ? <MoonIcon /> : <LightBulbIcon />;

    return (
        <Box {...props}>
            <Container maxW="xl" py={3} display="flex" justifyContent="space-between" alignItems="center">
                <Button variant="ghost" fontSize="xl">OnlySetups</Button>
                <Box>
                    <Menu>
                        <MenuButton as={IconButton} variant="ghost" aria-label="Toggle theme" icon={<FilterIcon />} />
                        <MenuList>
                        <MenuGroup title="Sort by">
                            <MenuItem>
                                <FireIcon mr={2} />
                                <span>Hot</span>
                            </MenuItem>
                            <MenuItem>
                                <SunIcon mr={2} />
                                <span>New</span>
                            </MenuItem>
                            <MenuItem>
                                <ChartBarIcon mr={2} />
                                <span>Top</span>
                            </MenuItem>
                        </MenuGroup>
                        </MenuList>
                    </Menu>
                    <IconButton ml={1} onClick={toggleColorMode} variant="ghost" aria-label="Toggle theme" icon={themeIcon} />
                </Box>
            </Container>
        </Box>
    )
}
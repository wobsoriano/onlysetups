import { Box, Text, Image, Flex, useColorModeValue } from "@chakra-ui/react";
import { ArrowUpIcon } from '@chakra-ui/icons'

export default function Card({ post }) {
    const cardColor = useColorModeValue("gray.100", "gray.700")

    return (
        <Box backgroundColor={cardColor} borderRadius={{ sm: 'sm', md: 'md' }} overflow="hidden">
            <Box onClick={() => view(post)} cursor="zoom-in" h="240px" position="relative">
            <Image w="100%" h="100%" objectFit="cover" src={post.src} />
            </Box>
            <Flex px="4" py="2" align="center" justify="space-between" w="100%">
            <Text fontSize={{ sm: 'xs', md: 'sm' }}>Posted by {post.author}</Text>
            <Flex align="center">
                <ArrowUpIcon />
                <Text ml={1} fontSize={{ sm: 'xs', md: 'sm' }}>{post.ups}</Text>
            </Flex>
            </Flex>
        </Box>
    )
}
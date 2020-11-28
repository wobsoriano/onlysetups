import { Box, Text, Image, Flex, useColorModeValue, Link, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function CardSkeleton () {
    const cardColor = useColorModeValue("gray.100", "gray.700")

    return (
        <Box backgroundColor={cardColor} borderRadius={['sm', null, 'md']} overflow="hidden">
            <Box h="240px" position="relative">
                <Image w="100%" h="100%" objectFit="cover" src={post.src} />
            </Box>
            <Flex px="4" py="2" align="center" justify="space-between" w="100%">
                <Text fontSize={['xs', null, 'sm']}>Posted by <Link fontWeight="semibold" href={`https://www.reddit.com/user/${post.author}/`} isExternal>u/{post.author}</Link></Text>
                <Flex align="center">
                    <ArrowUpIcon />
                    <Text ml={1} fontSize={['xs', null, 'sm']}>{post.ups.toLocaleString()}</Text>
                </Flex>
            </Flex>
        </Box>
    )
}
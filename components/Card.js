import { ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Flex, Img, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const MotionImg = motion.custom(Img);

export default function Card({ post, onImageClick }) {
    const cardColor = useColorModeValue('gray.100', 'gray.700');

    return (
        <Box backgroundColor={cardColor} borderRadius={['sm', null, 'md']} overflow="hidden">
            <Box
                onClick={() => onImageClick(post)}
                cursor="pointer"
                h="240px"
                position="relative"
                overflow="hidden">
                <MotionImg
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    src={post.src}
                />
            </Box>
            <Flex px="4" py="2" align="center" justify="space-between" w="100%">
                <Text fontSize={['xs', null, 'sm']}>
                    Posted by{' '}
                    <Link
                        fontWeight="semibold"
                        href={`https://www.reddit.com/user/${post.author}/`}
                        isExternal>
                        u/{post.author}
                    </Link>
                </Text>
                <Flex align="center">
                    <ArrowUpIcon />
                    <Text ml={1} fontSize={['xs', null, 'sm']}>
                        {post.ups.toLocaleString()}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
}

Card.propTypes = {
    post: PropTypes.object.isRequired,
    onImageClick: PropTypes.func.isRequired
};

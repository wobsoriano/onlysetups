import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Image, Text, Modal, useBreakpointValue, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, ModalFooter, HStack, Tooltip, Flex, Link, Box, Tag, Img } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { motion } from "framer-motion";

const MotionImage = motion.custom(Image);

export default function PreviewImage(props) {
    const { isOpen, onClose, post } = props;
    const size = useBreakpointValue({ base: "md", md: "2xl" })

    return (
        <Modal size={size} isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack spacing={1}>
                        {post.awards.map((award, index) => {
                            return (
                                <Tooltip key={index} label={award.description} aria-label="Award tooltip">
                                    <Flex>
                                        <MotionImage whileHover={{ rotate: [0, 10, -10, 0] }} src={award.src} />
                                        { award.count > 1 && <Text ml="2px" fontSize="xs">3</Text> }
                                    </Flex>
                                </Tooltip>
                            )
                        })}
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    { post.isGallery ? <Carousel showThumbs={false} dynamicHeight useKeyboardArrows>
                            { post.gallery.map((src) => <Img key={src} src={src} />) }
                        </Carousel> : <Img src={post.src} /> }
                    <Text mt={3} fontSize="lg" fontWeight="semibold">{post.title}</Text>
                    <Text fontSize="xs" mt={2}>Posted by <Link>u/{post.author}</Link> {post.createdAt}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button as="a" rightIcon={<ExternalLinkIcon />} colorScheme="gray" href={post.permalink} target="_blank" mr={3}>
                    Open in Reddit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
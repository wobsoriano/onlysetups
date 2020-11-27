import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Image, Text, Modal, useBreakpointValue, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, ModalFooter, HStack, Tooltip, Flex, Link, Box, Tag } from "@chakra-ui/react";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)


export default function PreviewImage(props) {
    const { isOpen, onClose, post } = props;
    const size = useBreakpointValue({ base: "md", md: "2xl" })

    return (
        <Modal size={size} isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack spacing={1}>
                        {post?.awards?.map((award, index) => {
                            return (
                                <Tooltip key={index} label={award.description} aria-label="Award tooltip">
                                    <Flex>
                                        <Image src={award.src} />
                                        { award.count > 1 && <Text ml="2px" fontSize="xs">3</Text> }
                                    </Flex>
                                </Tooltip>
                            )
                        })}
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Image cursor="pointer" src={post?.src} />
                    <Text mt={3} fontSize="lg" fontWeight="semibold">{post?.title}</Text>
                    <Text fontSize="xs" mt={2}>Posted by <Link>u/{post?.author}</Link> {dayjs(post?.created_utc).fromNow()}</Text>
                </ModalBody>
                <ModalFooter>
                    <Link href={post?.permalink} isExternal mr={3}>
                    Open in Reddit <ExternalLinkIcon mx="2px" />
                    </Link>
                    {/* <Button variant="ghost">View in Reddit</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
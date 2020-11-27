import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Image, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, ModalFooter, HStack, Tooltip, Flex, Link, Box } from "@chakra-ui/react";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)


export default function PreviewImage(props) {
    const { isOpen, onClose, post } = props;
    return (
        <Modal size="2xl" isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" >
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
                    {/* <Text fontSize="md" fontWeight="normal"><Link>u/{post?.author}</Link></Text> */}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Image cursor="pointer" src={post?.src} />
                    <Text mt={3} fontSize="lg" fontWeight="semibold">{post?.title}</Text>
                    <Text fontSize="xs">Posted by <Link>u/{post?.author}</Link> {dayjs(post?.created_utc).fromNow()}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button leftIcon={<ExternalLinkIcon />} colorScheme="gray" mr={3}>
                    Open in Reddit
                    </Button>
                    {/* <Button variant="ghost">View in Reddit</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
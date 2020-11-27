import { Image, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, ModalFooter, HStack, Tooltip, Flex } from "@chakra-ui/react";

export default function PreviewImage(props) {
    const { isOpen, onClose, post } = props;
    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack spacing={1}>
                        {post?.awards?.map((award, index) => {
                            return (
                                <Tooltip label={award.description} aria-label="Award tooltip">
                                    <Flex>
                                        <Image key={index} src={award.src} />
                                        { award.count > 1 && <Text ml={1} fontSize="xs">3</Text> }
                                    </Flex>
                                </Tooltip>
                            )
                        })}
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Image src={post?.src} />
                    <Text mt={2}>{post?.title}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
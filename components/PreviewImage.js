import { Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, ModalFooter } from "@chakra-ui/react";

export default function PreviewImage(props) {
    const { isOpen, onClose, post } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom" >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Image src={post?.src} />
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
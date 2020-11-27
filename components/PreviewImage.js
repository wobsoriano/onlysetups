import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, ModalFooter } from "@chakra-ui/react";
import NextImage from "next/image";

export default function PreviewImage(props) {
    const { isOpen, onClose, post } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom" >
            <ModalOverlay />
            <ModalContent backgroundColor="gray.700">
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <NextImage width={post?.width} height={post?.height} src={post?.src} />
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
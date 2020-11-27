import { Box, Container, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import useSWR from "swr";
import NextImage from "next/image";
import PreviewImage from '../components/PreviewImage';
import { useState } from "react";

const fetcher = () => {
  return fetch('https://www.reddit.com/r/battlestations.json?limit=15&raw_json=1')
  .then(res => res.json())
  .then(({ data }) => data.children.filter(i => i.data.post_hint === 'image'))
}


export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, error } = useSWR('r/battlestations', fetcher)
  const [selectedPost, setSelectedPost] = useState(null);

  if (error) {
    console.log(error)
    return <Box>Error</Box>
  }

  if (!data) return <Box>loading...</Box>

  const dataMapped = data.map((post) => {
    const {
      width,
      height,
      url
    } = post.data.preview.images[0].resolutions[3];

    return {
      id: post.data.id,
      src: url,
      author: post.data.author,
      width,
      height
    }
  });

  console.log(dataMapped)

  const view = (post) => {
    console.log('post', post)
    setSelectedPost(post);
    onOpen();
  }

  return (
    <Box shadow="sm" minHeight="100vh" display="flex" flexDir="column" backgroundColor="gray.900" paddingY={4}>
      <Container maxW="xl">
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
          {dataMapped.map((post) => (
            <Box key={post.id} backgroundColor="gray.700" borderRadius="lg" overflow="hidden">
              <Box onClick={() => view(post)} cursor="zoom-in" h="240px" position="relative">
                <NextImage layout="fill" objectFit="cover" src={post.src} />
              </Box>
              <Box p="2">
                <Text fontSize={{ sm: 'xs', md: 'sm' }} color="white">Posted by u/{post.author}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      <PreviewImage isOpen={isOpen} onClose={onClose} post={selectedPost} />
    </Box>
  )
}

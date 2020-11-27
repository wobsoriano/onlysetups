import { Box, Container, SimpleGrid, Text, useDisclosure, Image, Flex, Heading } from "@chakra-ui/react";
// import NextImage from "next/image";
import PreviewImage from "../components/PreviewImage";
import { useState } from "react";
import { ArrowUpIcon, MoonIcon } from '@chakra-ui/icons'
import { IconButton } from "@chakra-ui/react"

export default function Home({ posts }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedPost, setSelectedPost] = useState(null);

  const postsMapped = posts.map((post) => {
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
      height,
      ups: post.data.ups,
      downs: post.data.downs
    }
  });

  console.log(postsMapped)

  const view = (post) => {
    console.log('post', post)
    setSelectedPost(post);
    // onOpen();
  }

  return (
    <Box minHeight="100vh" display="flex" flexDir="column">
      <Box mb={8}>
        <Container maxW="xl" py={3} display="flex" justifyContent="space-between" alignItems="center">
          <Text color="gray.100" fontSize="2xl" fontWeight="semibold">OnlySetups</Text>
          <IconButton variant="ghost" color="gray.300" aria-label="Toggle theme" icon={<MoonIcon />} />
        </Container>
      </Box>
      <Container maxW="xl" mb={5}>
        <Box textAlign="center">
          <Heading as="h1" size="4xl" color="gray.300">PC Battlestations</Heading>
          <Text fontSize="lg" fontWeight="semibold" mt={2} color="gray.400">Epic workstations from r/battlestations</Text>
        </Box>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} mt={5}>
          {postsMapped.map((post) => (
            <Box key={post.id} backgroundColor="gray.700" borderRadius="lg" overflow="hidden">
              <Box onClick={() => view(post)} cursor="zoom-in" h="240px" position="relative">
                <Image w="100%" h="100%" objectFit="cover" src={post.src} />
              </Box>
              <Flex px="4" py="2" align="center" justify="space-between" w="100%">
                <Text fontSize={{ sm: 'xs', md: 'sm' }} color="white">Posted by {post.author}</Text>
                <Flex align="center">
                  <ArrowUpIcon color="white" />
                  <Text ml={1} fontSize={{ sm: 'xs', md: 'sm' }} color="white">{post.ups}</Text>
                </Flex>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      <PreviewImage isOpen={isOpen} onClose={onClose} post={selectedPost} />
    </Box>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://www.reddit.com/r/battlestations.json?raw_json=1');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      posts: data.data.children.filter(i => i.data.post_hint === 'image')
    }
  }
}
import { Box, Container, SimpleGrid, Text, useDisclosure, Image, Flex, Heading, useColorModeValue, Link } from "@chakra-ui/react";
import PreviewImage from "../components/PreviewImage";
import { useState } from "react";
import Header from '../components/Header';
import Card from '../components/Card';

export default function Home({ posts }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedPost, setSelectedPost] = useState(null);

  const cardColor = useColorModeValue("gray.100", "gray.700")

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
      <Header mb={8} />
      <Container maxW="xl" mb={5}>
        <Box textAlign="center">
          <Heading as="h1" size="4xl">PC Battlestations</Heading>
          <Text fontSize="lg" fontWeight="semibold" mt={2}>Epic workstations from <Link href="https://reddit.com/r/battlestations" isExternal>r/battlestations</Link></Text>
        </Box>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} mt={5}>
          {postsMapped.map((post) => <Card key={post.id} post={post} />)}
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
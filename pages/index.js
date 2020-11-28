import { Box, Container, SimpleGrid, Text, useDisclosure, Skeleton, Heading, Link, Button } from "@chakra-ui/react";
import { useState } from "react";

import Card from '../components/Card';
import PreviewImage from "../components/PreviewImage";
import Header from '../components/Header';

import { fromNow } from '../utils';
import useRedditPosts from '../utils/useRedditPosts';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedPost, setSelectedPost] = useState(null);
  const [filter, setFilter] = useState('hot');

  const {
    posts,
    error,
    isLoadingInitialData,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
  } = useRedditPosts('battlestations', filter);

  if (error) {
    console.log(error)
    return <Text>Error!</Text>
  }

  const postsMapped = !isLoadingInitialData ? posts.filter(i => i.data.post_hint === 'image').map((post) => {
    const {
      width,
      height,
      url
    } = post.data.preview.images[0].resolutions[3];

    return {
      id: post.data.id,
      title: post.data.title,
      src: url,
      author: post.data.author,
      width,
      height,
      ups: post.data.ups,
      awards: post.data.all_awardings.map((award) => ({
        src: award.resized_static_icons[0].url,
        count: award.count,
        description: award.description
      })),
      createdAt: fromNow(post.data.created_utc),
      fullResUrl: post.data.url,
      permalink: `https://reddit.com${post.data.permalink}`
    }
  }) : [];

  const view = (post) => {
    console.log('post', post)
    setSelectedPost(post);
    onOpen();
  }

  return (
    <Box minHeight="100vh" display="flex" flexDir="column">
      <Header mb={8} filter={filter} setFilter={setFilter} />
      <Container maxW="xl" mb={5}>
          <Box textAlign="center">
            <Heading as="h1" size="4xl">PC Battlestations</Heading>
            <Text fontSize="lg" fontWeight="semibold" mt={2}>Epic workstations from <Link href="https://reddit.com/r/battlestations" isExternal>r/battlestations</Link></Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mt={5}>
            {postsMapped.map((post) => <Card key={post.id} post={post} onImageClick={view}  />)}

            {(isLoadingInitialData || isLoadingMore) && [...Array(15).keys()].map((item) => (
              <Skeleton key={item}>
                <Box h="240px" />
              </Skeleton>
            ))}
          </SimpleGrid>

          { !isReachingEnd && <Box textAlign="center" mt={5}>
            <Button onClick={() => setSize(size + 1)} isLoading={isLoadingMore}>Load More</Button>
          </Box> }
      </Container>
      { selectedPost && <PreviewImage isOpen={isOpen} onClose={onClose} post={selectedPost} onImageClick={view} />}
    </Box>
  )
}
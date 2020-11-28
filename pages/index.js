import { Box, Container, SimpleGrid, Text, useDisclosure, Skeleton, Heading, Link, Button } from "@chakra-ui/react";
import { useState } from "react";

import Card from '../components/Card';
import PreviewImage from "../components/PreviewImage";
import Header from '../components/Header';

import { fromNow } from '../utils';
import useRedditPosts from '../utils/useRedditPosts';
import { RepeatIcon } from "@chakra-ui/icons";

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
    return (<Text p={4}>An error occurred. Please <Link href="/">reload</Link>.</Text>)
  }

  const postsMapped = !isLoadingInitialData ? posts.filter(i => !i.data.stickied).map((post) => {
    let url;
    let gallery = [];

    if (post.data.is_gallery) {
      const galleryIds = Object.keys(post.data.media_metadata);
      url = post.data.media_metadata[galleryIds[0]].p[3].u;
      gallery = galleryIds.map((id) => post.data.media_metadata[id].p[3].u)
    } else {
      url = post.data.preview.images[0].resolutions[3].url;
    }

    return {
      id: post.data.id,
      title: post.data.title,
      src: url,
      author: post.data.author,
      ups: post.data.ups,
      awards: post.data.all_awardings.map((award) => ({
        src: award.resized_static_icons[0].url,
        count: award.count,
        description: award.description
      })),
      createdAt: fromNow(post.data.created_utc),
      fullResUrl: post.data.url,
      permalink: `https://reddit.com${post.data.permalink}`,
      isGallery: post.data.is_gallery === true,
      gallery
    }
  }) : [];

  const view = (post) => {
    setSelectedPost(post);
    onOpen();
  }

  return (
    <Box minHeight="100vh" display="flex" flexDir="column">
      <Header filter={filter} setFilter={setFilter} />
      <Container maxW="xl" mt="95px">
          <Box textAlign="center">
            <Heading as="h1" size="4xl">PC Battlestations</Heading>
            <Text fontSize="lg" fontWeight="semibold" mt={2}>Epic setups from <Link href="https://reddit.com/r/battlestations" isExternal>r/battlestations</Link></Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mt={5}>
            {postsMapped.map((post) => <Card key={post.id} post={post} onImageClick={view}  />)}

            {(isLoadingInitialData || isLoadingMore) && [...Array(15).keys()].map((item) => <Skeleton borderRadius={['sm', null, 'md']} key={item} height="275px" />)}
          </SimpleGrid>

          { !isReachingEnd && <Box textAlign="center" mt={8}>
            <Button leftIcon={<RepeatIcon />} onClick={() => setSize(size + 1)} isLoading={isLoadingMore}>Load More</Button>
          </Box> }
      </Container>
      { selectedPost && <PreviewImage isOpen={isOpen} onClose={onClose} post={selectedPost} />}
      <Container as="footer" maxW="xl" textAlign="center" py={10}>
          <Text>Made with ❤️ &nbsp; by <Link href="http://robsoriano.com/" isExternal>Robert</Link></Text>
      </Container>
    </Box>
  )
}
import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import useSWR from "swr";
import NextImage from "next/image";

const fetcher = () => {
  return fetch('https://www.reddit.com/r/battlestations.json?limit=15&raw_json=1')
  .then(res => res.json())
  .then(({ data }) => data.children.slice(2).filter(i => i.data.hasOwnProperty('preview')))
}


export default function Home() {
  const { data, error } = useSWR('r/battlestations', fetcher)

  if (error) {
    console.log(error)
    return <Box>Error</Box>
  }

  if (!data) return <Box>loading...</Box>

  const dataMapped = data.map((post) => {
    return {
      id: post.data.id,
      src: post.data.preview.images[0].resolutions[3].url,
      author: post.data.author
    }
  });

  console.log(dataMapped)

  return (
    <Box shadow="sm" minHeight="100vh" display="flex" flexDir="column" backgroundColor="gray.900" paddingY={4}>
      <Container maxW="xl">
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
          {dataMapped.map((post) => (
            <Box key={post.id} backgroundColor="gray.700" borderRadius="lg" overflow="hidden">
              <Box h="240px" position="relative">
                <NextImage quality="50" layout="fill" objectFit="cover" src={post.src} />
              </Box>
              <Box p="2">
                <Text fontSize={{ sm: 'xs', md: 'sm' }} color="white">Posted by u/{post.author}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

import { Box, Container, SimpleGrid, Image } from "@chakra-ui/react";
import useSWR from "swr";
import NextImage from "next/image";

const fetcher = () => {
  return fetch('https://www.reddit.com/r/battlestations.json?limit=15&raw_json=1')
  .then(res => res.json())
  .then(({ data }) => data.children.slice(2).filter(i => i.data.hasOwnProperty('preview')))
}


export default function Home() {
  const { data, error } = useSWR('/r/battlestations', fetcher)

  if (error) {
    console.log(error)
    return <Box>Error</Box>
  }

  if (!data) return <Box>loading...</Box>

  const dataMapped = data.map((post) => {
    return {
      id: post.data.id,
      src: post.data.preview.images[0].resolutions[3].url
    }
  });

  console.log(dataMapped)

  return (
    <Box shadow="sm" minHeight="100vh" display="flex" flexDir="column" backgroundColor="gray.200" paddingY={4}>
      <Container maxW="xl">
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
          {dataMapped.map((post) => (
            <Box key={post.id} w="100%" h="240px" backgroundColor="white" position="relative">
              <NextImage quality="50" layout="fill" objectFit="cover" src={post.src} />
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

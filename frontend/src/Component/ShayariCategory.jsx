import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';

const Shyari = () => {
  const [topic, setTopic] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://chatgtp-tjq4.onrender.com/shayari', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, query }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setResponse(data.shayari);
      } else {
        setResponse(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      setResponse('Error: An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Container maxW="xl">
      <Heading as="h1" mt={4} mb={6}>
        Shariyar
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="topic" isRequired>
          <FormLabel>Topic:</FormLabel>
          <Input
            type="text"
            name="topic"
            placeholder="Story, Myth, Shyari, or other"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </FormControl>
        <FormControl id="query" isRequired mt={2}>
          <FormLabel>Subject:</FormLabel>
          <Input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </FormControl>
        <Button type="submit" isLoading={isLoading} mt={4}>
          Generate Response
        </Button>
      </form>
      <Box mt={6}>
        <Text fontSize="lg" fontWeight="bold">
          Response:
        </Text>
        <Text fontSize="lg" whiteSpace="pre-line">
          {response}
        </Text>
      </Box>
      <Button
        mt={6}
        onClick={handleRefresh}
        variant="outline"
        colorScheme="blue"
      >
        Refresh
      </Button>
    </Container>
  );
};

export default Shyari;

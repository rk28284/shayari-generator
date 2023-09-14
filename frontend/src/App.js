// src/App.js
import { Box, Container, Heading } from "@chakra-ui/react";
import Shyari from "./Component/ShayariCategory";
; // Import your Shayari category component

function App() {
  return (
      <Box bg="grey.100" minHeight="100vh">
        <Container maxW="xl" py="4">
          <Heading as="h1" size="xl" mb="4">
            Shayari App
          </Heading>
        <Shyari/>
           
        </Container>
      </Box>
  );
}

export default App;

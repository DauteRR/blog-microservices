import { Box, CSSReset, Flex, Heading } from '@chakra-ui/core';
import React from 'react';
import { PostCreate } from '../PostCreate';
import { theme } from '@chakra-ui/core';
import { ThemeProvider } from '@chakra-ui/core';

export const customTheme = {
  ...theme,
  colors: {
    ...theme.colors
  }
};

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Flex justify="center">
        <Box marginTop={customTheme.space['10']} width={600}>
          <Heading marginBottom={customTheme.space['4']} as="h1">
            Create Post
          </Heading>
          <PostCreate />
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

export default App;

import { Box, CSSReset, Divider, Flex, Heading } from '@chakra-ui/core';
import React from 'react';
import { PostCreate } from '../PostCreate';
import { theme } from '@chakra-ui/core';
import { ThemeProvider } from '@chakra-ui/core';
import PostList from '../PostList';
import { ReloadContextProvider } from '../../contexts/Reload';

export const customTheme = {
  ...theme,
  colors: {
    ...theme.colors
  }
};

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <ReloadContextProvider>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Flex justify="center">
          <Box marginTop={customTheme.space[10]} maxW="6xl">
            <Heading marginBottom={customTheme.space[6]} as="h1">
              Create Post
            </Heading>
            <PostCreate />
            <Divider borderColor="teal.500" />
            <PostList />
          </Box>
        </Flex>
      </ThemeProvider>
    </ReloadContextProvider>
  );
};

export default App;

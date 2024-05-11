import { Box, Button, Container, Flex, Heading, IconButton, Image, Input, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaPlus, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [activities, setActivities] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddActivity = () => {
    if (inputValue.trim() !== "") {
      setActivities([...activities, { name: inputValue, votes: 0 }]);
      setInputValue("");
    }
  };

  const handleVote = (index, delta) => {
    const newActivities = [...activities];
    newActivities[index].votes += delta;
    setActivities(newActivities);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl" color={useColorModeValue("gray.800", "white")}>
          Plan Your Activities
        </Heading>
        <Flex width="100%" justify="center">
          <Input placeholder="Add a new activity..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} size="md" mr={2} />
          <IconButton aria-label="Add activity" icon={<FaPlus />} onClick={handleAddActivity} colorScheme="blue" />
        </Flex>
        <Stack spacing={4} align="stretch" width="100%">
          {activities.map((activity, index) => (
            <Flex key={index} justify="space-between" align="center" p={4} borderWidth="1px" borderRadius="lg">
              <Text fontSize="lg" fontWeight="bold">
                {activity.name}
              </Text>
              <Box>
                <IconButton aria-label="Upvote" icon={<FaThumbsUp />} onClick={() => handleVote(index, 1)} colorScheme="green" mr={2} />
                <Text as="span" px={4}>
                  {activity.votes}
                </Text>
                <IconButton aria-label="Downvote" icon={<FaThumbsDown />} onClick={() => handleVote(index, -1)} colorScheme="red" />
              </Box>
            </Flex>
          ))}
        </Stack>
        {activities.length === 0 && <Text color="gray.500">No activities added yet. Start by adding one above!</Text>}
      </VStack>
    </Container>
  );
};

export default Index;

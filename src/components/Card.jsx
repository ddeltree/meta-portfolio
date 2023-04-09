import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack
      spacing={4}
      bg="white"
      color="black"
      borderRadius="2xl"
      overflow="hidden"
    >
      <Image src={imageSrc} alt={title} borderRadius="xl" />
      <VStack spacing={4} align="left" padding="16px">
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text color="gray.500">{description}</Text>
        <HStack>
          <Text>See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;

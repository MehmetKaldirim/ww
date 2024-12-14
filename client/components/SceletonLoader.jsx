import React from "react";
import { Skeleton, VStack, Text } from "native-base";

const SkeletonLoader = () => {
  return (
    <VStack w="55%">
      <Skeleton h="230" rounded="20" startColor="primary.200" />
      <Text
        mt="3"
        alignSelf="center"
        color="primary.50"
        fontSize="15"
        fontWeight="500"
      >
        Data is loading ...
      </Text>
      <Skeleton mt="3" h="120" rounded="20" startColor="primary.200" />
    </VStack>
  );
};

export default SkeletonLoader;

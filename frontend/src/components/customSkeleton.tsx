import { Stack, HStack } from "@chakra-ui/react";
import { SkeletonCircle, SkeletonText } from "@/components/ui/skeleton";

const CustomSkeleton = () => (
  <Stack gap="6" maxW="100%">
    <HStack width="full">
      <SkeletonCircle size="10" />
      <SkeletonText noOfLines={2} />
    </HStack>
  </Stack>
);

export default CustomSkeleton;

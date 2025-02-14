import React from 'react';
import {
  Box,
  Image,
  Skeleton,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa';

interface ImagePreviewProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  width = "100%",
  height = "250px"
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  return (
    <Box width={width} height={height} position="relative">
      {isLoading && (
        <Skeleton
          width={width}
          height={height}
          position="absolute"
          top="0"
          left="0"
        />
      )}
      {error ? (
        <VStack
          width={width}
          height={height}
          bg="gray.100"
          _dark={{ bg: 'gray.700' }}
          justify="center"
          align="center"
          spacing={2}
        >
          <Icon as={FaImage} boxSize="40px" color="gray.400" />
          <Text color="gray.500">Failed to load image</Text>
        </VStack>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          objectFit="cover"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
          style={{ opacity: isLoading ? 0 : 1 }}
        />
      )}
    </Box>
  );
}

export default ImagePreview; 
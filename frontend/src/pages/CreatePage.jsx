import { useProductStore } from '../store/product'
import { Container, VStack, Heading, Box, useColorModeValue,Input,Button,useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

const CreatePage = () => {
  const [newProduct, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  })
  const toast = useToast();
  const {createProduct} = useProductStore()
  const handleAddProduct = async() => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Product Created Successfully",
        status: "success",
        isClosable: true,
      });
      setProduct({ name: "", price: "", image: "" });
    }
  }


  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size={"2xl"} textAlign="center" mb={8} color={"purple.500"}>
          Create New Product
        </Heading>
      
      <Box w={"full"} bg={useColorModeValue("white","gray.800")}
        p={6} rounded="lg" shadow="md"
      > 
        <VStack spacing={4}>
          <Input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            name='name'
            onChange={(e) =>
              setProduct({...newProduct, name: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            name = 'price'
            onChange={(e) =>
              setProduct({...newProduct, price: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Product Image URL"
            value={newProduct.image}
            name = 'image'
            onChange={(e) =>
              setProduct({...newProduct, image: e.target.value })
            }
          />
          <Button colorScheme='purple' w = "full" onClick={handleAddProduct}>
            Submit
          </Button>
        </VStack>


      </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
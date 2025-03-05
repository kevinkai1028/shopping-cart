import { Box, HStack, IconButton, Image, Heading, Text, VStack, Input, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useColorModeValue } from '@chakra-ui/react'

import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useProductStore } from '../store/product';
import { useToast } from "@chakra-ui/react";
import {   Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure } from "@chakra-ui/react";

const ProductCard = ({product}) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textcolor = useColorModeValue('gray.600', 'gray.200');
  const bg=useColorModeValue('white', 'gray.800');
  
  const {deleteProduct, updateProduct} = useProductStore()
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const handleDeleteProduct = async(productId) => {
    const {success, message} = await deleteProduct(productId)
    if(success){
        toast({title: message, status:'success', duration: 3000, isClosable: true,})
    }else{  
        toast({title: message, status:'error', duration: 3000, isClosable: true,})
    } 
  }

  const handleUpdateProduct = async(productId, updatedProduct) => {
    const {success, message} = await updateProduct(productId, updatedProduct)
    onClose()
    if(success){
        toast({title: message, status:'success', duration: 3000, isClosable: true,})
    }else{  
        toast({title: message, status:'error', duration: 3000, isClosable: true,})
    }
  }
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{transform:"translateY(-5px)", shadow:"xl"}}
    bg = {bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
        <Box p={6}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='semibold' color={textcolor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<FiEdit />} colorScheme='purple' onClick={onOpen}/>
                <IconButton icon={<MdDelete />} colorScheme='red' onClick={()=>handleDeleteProduct(product._id)}/>
            </HStack>
        </Box>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update the Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <VStack spacing={4}>
                        <Input placeholder="Product Name" name='name' 
                        value={updatedProduct.name}
                        onChange={(e)=>setUpdatedProduct({...updateProduct, name: e.target.value})}/>
                        <Input type="number" placeholder="Product Price" name='price' 
                        value={updatedProduct.price}
                        onChange={(e)=>setUpdatedProduct({...updateProduct, price: e.target.value})}/>
                        <Input placeholder="Product Image URL" name='image' 
                        value={updatedProduct.image}
                        onChange={(e)=>setUpdatedProduct({...updateProduct, image: e.target.value})}/>
                    </VStack>
                </ModalBody>

            <ModalFooter>
                <Button colorScheme='purple' mr={3} w="20%"
                onClick={()=> handleUpdateProduct(product._id, updatedProduct)}>
                Save
                </Button>
                <Button onClick={onClose} w="20%">Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>

    </Box>
  )
}

export default ProductCard
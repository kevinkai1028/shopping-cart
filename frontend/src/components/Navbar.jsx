import { PlusSquareIcon } from '@chakra-ui/icons'
import { Button, Container, Flex,Text, HStack } from '@chakra-ui/react'
import React from 'react'
import {Link, Links} from "react-router-dom"
import { useColorMode } from '@chakra-ui/react'
import { LuFlashlight, LuFlashlightOff } from "react-icons/lu";

const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{base:"column", sm:"row"}}
      > 
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight='extrabold'
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient='linear(to-l, #7928CA, #FF0080)'
					bgClip='text'
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>
        
        <HStack spacing={1} alignItems={"center"} >
          <Link to={"/create"}>
          <Button>
            <PlusSquareIcon fontSize={20}/>
          </Button>
          </Link>
          <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <LuFlashlight />: <LuFlashlightOff />}
          </Button>
          
        </HStack>

      </Flex>
    </Container>
  )
}

export default Navbar
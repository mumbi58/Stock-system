import { Box,Stat,StatLabel,StatNumber } from "@chakra-ui/react"
export default function Users() {
  return (
    <Box p="5" shadow="md" borderWidth="1px">
    <Stat>
      <StatLabel>Number of Users</StatLabel>
      <StatNumber>hello</StatNumber>
    </Stat>
  </Box>
  )
}

import { Box } from '@chakra-ui/react'
import { useState,useEffect } from 'react'

export default function Fetchuser() {
    const [User, setUser] = useState([])

    useEffect(() => {
        const Users = async () => {
          const user = await fetch("http://localhost:8000/users")
          const data = await user.json()
          setUser(data)
          console.log(data.name);
    
        }
        Users()
    
      }, [])
      return(User)

  
}

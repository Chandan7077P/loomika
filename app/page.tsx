import React from 'react'
import { Button } from '@/components/ui/button'
import Container from '@/components/Container'

const Home = () => {
  return (
    <Container>
      <h2 className='text-xl font-semibold'>Home</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
        doloribus illum molestiae maiores minima soluta tenetur. Atque, aperiam,
        reiciendis, officiis sequi quo consequuntur aliquid velit dicta soluta
        ratione unde illo similique praesentium aliquam iusto eum voluptatibus
        recusandae nihil debitis! Eum, iusto recusandae. In quam saepe nobis
        obcaecati iste blanditiis odit!.
      </p>
      <Button size='lg'>Explore More</Button>
    </Container>
  )
}

export default Home

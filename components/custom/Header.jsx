import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Colors from '@/data/Colors'

const Header = () => {
  return (
    <div className='p-4 flex justify-between items-center'>
    <h3>Logo</h3>
    <div className="flex gap-5">
        <Button variant='ghost'>Sign In</Button>
        <Button style={{backgroundColor:Colors.BLUE}} className='text-white'>Get Started</Button>
    </div>
      
    </div>
  )
}

export default Header

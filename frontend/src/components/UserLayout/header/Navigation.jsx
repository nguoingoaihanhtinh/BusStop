import React from 'react'


const menu = [
    'Service',
    'Ticket',
    'About'
]
const Navigation = () => {

  return (
    <div className="flex gap-8 items-center text-center">
      {menu.map((item, index) => (
        <div key={index} className="hover:underline cursor-pointer text-2xl">
          {item}
        </div>
      ))}
    </div>
  )
}

export default Navigation
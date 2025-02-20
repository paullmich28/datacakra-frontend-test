import React from 'react'

const CommentBox = ({comment}) => {
  return (
    <div className='w-full p-8 bg-gray-200 my-5 rounded-lg'>
      <h1>{comment}</h1>
    </div>
  )
}

export default CommentBox
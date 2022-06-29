import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

export default function ResultPage({props}) {

    const router = useRouter()
    const { pid } = router.query


  return (
    <div>{pid}</div>
  )
}

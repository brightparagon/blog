'use client'

import { format } from 'date-fns'

interface Props {
  className?: string
  createdAt: string
}

export default function CreatedAt({ className, createdAt }: Props) {
  return <span className={className}>{format(new Date(createdAt.replace(/-/g, '/')), 'yyyy-MM-dd HH:mm')}</span>
}

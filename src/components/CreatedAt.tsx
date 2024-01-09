'use client'

import { format } from 'date-fns'

interface Props {
  className?: string
  createdAt: string
}

export function CreatedAt({ className, createdAt }: Props) {
  return <span className={className}>{format(createdAt, 'yyyy-MM-dd HH:mm')}</span>
}

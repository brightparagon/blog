const wordsPerMinute = 300

export function getReadingTime(text: string) {
  const numberOfWords = text.split(/\s/g).length
  const minutes = numberOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)

  return `${readTime} min read`
}

export function getAltFromThumbnailUrl(thumbnail: string) {
  return /\w+.jpg/.exec(thumbnail)?.[0].split('.')[0] ?? 'thumbnail image'
}

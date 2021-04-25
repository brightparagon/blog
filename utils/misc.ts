const wordsPerMinute = 300

export const getReadingTime = (text: string) => {
  const numberOfWords = text.split(/\s/g).length
  const minutes = numberOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)

  return `${readTime} min read`
}

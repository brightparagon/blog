export function isPublishReadyPost(filename: string) {
  return !filename.startsWith('pending');
}

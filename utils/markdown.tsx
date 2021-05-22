import { ComponentProps } from 'react'
import Markdown from 'react-markdown'

import CodeBlock from '../src/components/CodeBlock'

type MarkdownProps = Pick<ComponentProps<typeof Markdown>, 'components'>

export const markdownOptions: MarkdownProps = {
  components: {
    code: ({ className, inline, children, ...props }) => {
      const classNameWithLanguage = className as string
      const match = /language-(\w+)/.exec(classNameWithLanguage ?? '')

      if (!inline && match) {
        return <CodeBlock language={match[1]} children={children.toString().replace(/\n$/, '')} {...props} />
      }

      return <code className={classNameWithLanguage} {...props} />
    },
  },
}

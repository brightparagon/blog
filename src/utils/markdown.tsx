import { ComponentProps } from 'react'
import Markdown from 'react-markdown'

import CodeBlock from 'components/CodeBlock'

type MarkdownProps = Pick<ComponentProps<typeof Markdown>, 'components'>

export const markdownOptions: MarkdownProps = {
  components: {
    // eslint-disable-next-line react/display-name
    code: ({ className, inline, children, ...props }) => {
      const classNameWithLanguage = className as string
      const match = /language-(\w+)/.exec(classNameWithLanguage ?? '')

      if (!inline && match) {
        // eslint-disable-next-line react/no-children-prop
        return <CodeBlock language={match[1]} children={children.toString().replace(/\n$/, '')} {...props} />
      }

      return <code className={classNameWithLanguage} {...props} />
    },
  },
}

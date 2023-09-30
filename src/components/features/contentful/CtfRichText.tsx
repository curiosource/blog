import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, MARKS } from '@contentful/rich-text-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { ArticleImage } from '@src/components/features/article';
import { ComponentRichImage } from '@src/lib/__generated/sdk';
import { Mark, Text } from '@contentful/rich-text-types/dist/types/types';

export type EmbeddedEntryType = ComponentRichImage | null;

export interface ContentfulRichTextInterface {
  json: Document;
  links?:
    | {
        entries: {
          block: Array<EmbeddedEntryType>;
        };
      }
    | any;
}

export const EmbeddedEntry = (entry: EmbeddedEntryType) => {
  switch (entry?.__typename) {
    case 'ComponentRichImage':
      return <ArticleImage image={entry} />;
    default:
      return null;
  }
};

export const contentfulBaseRichTextOptions = ({ links }: ContentfulRichTextInterface): Options => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const entry = links?.entries?.block?.find(
        (item: EmbeddedEntryType) => item?.sys?.id === node.data.target.sys.id,
      );
      if (!entry) return null;
      return <EmbeddedEntry {...entry} />;
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (node.content.length === 1 && node.content[0]['marks'].find(x => x.type === 'code')) {
        return <div>{children}</div>;
      }
      return <p>{children}</p>;
    },
  },

  renderMark: {
    [MARKS.CODE]: text => {
      return (
        <SyntaxHighlighter style={vscDarkPlus} language="javascript" PreTag="pre">
          {String(text).split('\n').slice(0).join('\n')}
        </SyntaxHighlighter>
      );
    },
  },
});

export const CtfRichText = ({ json, links }: ContentfulRichTextInterface) => {
  const baseOptions = contentfulBaseRichTextOptions({ links, json });

  return (
    <article className="prose prose-sm max-w-none">
      {documentToReactComponents(json, baseOptions)}
    </article>
  );
};

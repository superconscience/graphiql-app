import '@graphiql/plugin-explorer/dist/style.css';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import GraphiQLExplorer, { GraphiQLExplorerProps } from 'graphiql-explorer';
import 'graphiql/graphiql.css';
import { GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';
import './explorer/index.css';

export const GraphiQLWithExplorer = (props: GraphiQLExplorerProps & { url: string }) => {
  const [schema, setSchema] = useState<{
    schema: GraphQLSchema | null;
  }>({ schema: null });

  useEffect(() => {
    async function fetchSchema() {
      const remoteExecutor = buildHTTPExecutor({ endpoint: props.url });
      const postsSubschema = {
        schema: await schemaFromExecutor(remoteExecutor),
      };
      setSchema(postsSubschema);
    }
    fetchSchema();
  }, [props.url]);

  if (!schema || !schema.schema) {
    return <div>Loading schema...</div>;
  }
  console.log(schema);
  return (
    <GraphiQLExplorer
      schema={schema.schema}
      onRunOperation={(operationName) => {}}
      explorerIsOpen
      colors={{
        keyword: 'hsl(var(--color-primary))',
        def: 'hsl(var(--color-tertiary))',
        property: 'hsl(var(--color-info))',
        qualifier: 'hsl(var(--color-secondary))',
        attribute: 'hsl(var(--color-tertiary))',
        number: 'hsl(var(--color-success))',
        string: 'hsl(var(--color-warning))',
        builtin: 'hsl(var(--color-success))',
        string2: 'hsl(var(--color-secondary))',
        variable: 'hsl(var(--color-secondary))',
        atom: 'hsl(var(--color-tertiary))',
      }}
      arrowOpen={
        <svg
          viewBox="0 -4 13 15"
          style={{
            color: 'hsla(var(--color-neutral), var(--alpha-tertiary, 0.4))',
            marginRight: 'var(--px-4)',
            height: 'var(--px-16)',
            width: 'var(--px-16)',
          }}
        >
          <path
            d="M3.35355 6.85355L6.14645 9.64645C6.34171 9.84171 6.65829 9.84171 6.85355 9.64645L9.64645 6.85355C9.96143 6.53857 9.73835 6 9.29289 6L3.70711 6C3.26165 6 3.03857 6.53857 3.35355 6.85355Z"
            fill="currentColor"
          />
        </svg>
      }
      arrowClosed={
        <svg
          viewBox="0 -2 13 15"
          style={{
            color: 'hsla(var(--color-neutral), var(--alpha-tertiary, 0.4))',
            marginRight: 'var(--px-4)',
            height: 'var(--px-16)',
            width: 'var(--px-16)',
          }}
        >
          <path
            d="M6.35355 11.1464L9.14645 8.35355C9.34171 8.15829 9.34171 7.84171 9.14645 7.64645L6.35355 4.85355C6.03857 4.53857 5.5 4.76165 5.5 5.20711V10.7929C5.5 11.2383 6.03857 11.4614 6.35355 11.1464Z"
            fill="currentColor"
          />
        </svg>
      }
      checkboxUnchecked={
        <svg
          viewBox="0 0 15 15"
          style={{
            color: 'hsla(var(--color-neutral), var(--alpha-tertiary, 0.4))',
            marginRight: 'var(--px-4)',
            height: 'var(--px-16)',
            width: 'var(--px-16)',
          }}
        >
          <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" fill="none" />
        </svg>
      }
      checkboxChecked={
        <svg
          viewBox="0 0 15 15"
          style={{
            color: 'hsl(var(--color-info))',
            marginRight: 'var(--px-4)',
            height: 'var(--px-16)',
            width: 'var(--px-16)',
          }}
        >
          <circle cx="7.5" cy="7.5" r="7.5" fill="currentColor" />
          <path
            d="M4.64641 7.00106L6.8801 9.23256L10.5017 5.61325"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      }
      styles={{
        buttonStyle: {
          backgroundColor: 'transparent',
          border: 'none',
          color: 'hsla(var(--color-neutral), var(--alpha-secondary, 0.6))',
          cursor: 'pointer',
          fontSize: '1em',
        },
        explorerActionsStyle: {
          padding: 'var(--px-8) var(--px-4)',
        },
        actionButtonStyle: {
          backgroundColor: 'transparent',
          border: 'none',
          color: 'hsla(var(--color-neutral), var(--alpha-secondary, 0.6))',
          cursor: 'pointer',
          fontSize: '1em',
        },
      }}
      {...props}
    />
  );
};

import { DocumentNode } from 'graphql';

declare global {
  type ComponentWithFragment<T> = React.FC<T> & {
    fragment: DocumentNode;
  };
}

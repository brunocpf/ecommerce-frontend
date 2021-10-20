import { withApollo } from 'next-apollo';
import apolloClient from './apolloClient';

export default withApollo(apolloClient);

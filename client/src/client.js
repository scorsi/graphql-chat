import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import ApolloClient from 'apollo-client/ApolloClient';
import {InMemoryCache} from 'apollo-cache-inmemory';


const createClient = token => {
  const httpLink = new HttpLink({uri: 'http://localhost:4000/graphql'});
  const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
};

export default createClient;
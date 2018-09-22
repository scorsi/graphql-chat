import {schemaComposer} from 'graphql-compose';

import {User, UserTC} from './User';

const schema = schemaComposer.buildSchema();

export default schema;
export {User, UserTC};
import server from './server';
import fullSampleDataModel from '../sample/full/dataModel';

const resolvers = {};
const serverSettings = {};

server(serverSettings, fullSampleDataModel, resolvers);

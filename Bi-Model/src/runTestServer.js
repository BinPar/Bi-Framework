import server from './server';
import fullSampleDataModel from '../sample/full/dataModel';

const resolvers = {};
const serverSettings = {};
process.stdout.write('\x1B[2J\x1B[0f'); // To clear the console

server(serverSettings, fullSampleDataModel, resolvers);

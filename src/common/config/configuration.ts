// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env' });
import { TConfiguration } from './configuration.interface';

export const configuration = (): TConfiguration => ({
  mongoUrl: process.env.MONGO_URL,
  dbName: process.env.DB_NAME,
});

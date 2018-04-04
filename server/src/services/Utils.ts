import { Logger } from 'log4js';
import mongoose from 'mongoose';
import IConfig from '../Interfaces/IConfig';

export async function InitiateDatabase(log: Logger, settingsConfig: IConfig) {
    const options = {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 5000,
        bufferMaxEntries: 0
    };

    let connect = function() {
        mongoose.connect(settingsConfig.dbConnectionString, options)
        .then(() => log.info('Connected to DB'))
        .catch((err) => {
            log.error(`Cannot connect to DB. Details: ${err}`);
            mongoose.disconnect();
            setTimeout(connect, 5000);
        });
    };

    mongoose.Promise = global.Promise;
    let connection = mongoose.connection;
    connection.on('connected', () => log.info('Connected to DB'));
    connection.on('error', () => log.error('MongoDB connection error'));
    connection.on('disconnected', () => log.error('MongoDB disconnected'));

    connect();
}
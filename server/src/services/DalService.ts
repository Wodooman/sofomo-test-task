const mongoose = require('mongoose');
import { ISurfingTrick } from '../Interfaces/ISurfingTrick';
import { ISurfingTrickModel, SurfingTrick } from '../models/SurfingTrick';

export async function getAllSurfingTricks(): Promise<Array<ISurfingTrickModel>> {
    checkDbConnection();

    let result = await SurfingTrick.find().exec();
    return result;
}

export async function createNewTrick(trick: ISurfingTrick): Promise<ISurfingTrickModel> {
    checkDbConnection();

    let model = new SurfingTrick(trick);
    return await model.save();
}

export async function getSurfingTrickByName(name: string): Promise<ISurfingTrickModel> {
    checkDbConnection();

    let result = await SurfingTrick.findOne({'name': name}).exec();
    if (!result) {
        throw new Error(`Trick with name '${name}' wasn't found`);
    }

    return result;
}

function checkDbConnection() {
    if (mongoose.connection.readyState !== 1) {
        throw new Error('Database is not reachable');
    }
}
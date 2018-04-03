import mongoose from 'mongoose';
import { Document, Schema, Model, model } from 'mongoose';
import { ISurfingTrick } from '../Interfaces/ISurfingTrick';

export interface ISurfingTrickModel extends ISurfingTrick, Document {
}

export let SurfingTrickSchema: Schema = new Schema({
    name: { type: String, unique: true, required: true },
    youTubeLinkExample1: { type: String, required: true },
    youTubeLinkExample2: String,
    complexity: { type: String, required: true },
    requiredSpeed: { type: String, required: true }
});

export const SurfingTrick: Model<ISurfingTrickModel> = model<ISurfingTrickModel>('SurfingTrick', SurfingTrickSchema);
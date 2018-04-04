import { expect, should } from 'chai';
import 'mocha';
import * as DalService from '../src/services/DalService';

describe('checkDbConnection function', () => {
    it('thrown exception on not open connection', () => {
        expect(DalService.checkDbConnection).to.throw('Database is not reachable');
    });
});
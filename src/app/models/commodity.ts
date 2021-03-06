import { generateNewId } from './utils';
import { schema } from 'normalizr';

export const commoditySchema = new schema.Entity('commodities');
export const commodityListSchema = [commoditySchema];

export class Commodity {
  id: string = '';
  pickupNumber: number;
  dropoffNumber: number;
  po: string = '';
  commodity: string = '';
  unitType: string = '';
  unitCount: number;
  palletCount: number;
  weight: number;

  static create(): Commodity{
    const result = new Commodity();
    result.id = generateNewId();
    return result;
  }
}

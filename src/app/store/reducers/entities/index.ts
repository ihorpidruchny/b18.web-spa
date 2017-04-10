import { combineReducers } from 'redux';
import { companyReducer } from './company.reducer';
import { contactReducer } from './contact.reducer';
import { driverReducer } from './driver.reducer';
import { equipmentReducer } from './equipment.reducer';
import { locationReducer } from './location.reducer';

export interface IEntitiesState {
  companies: Array<any>;
  contacts: Array<any>;
  drivers: Array<any>;
  equipments: Array<any>;
  locations: Array<any>;
}

export const entitiesReducer = combineReducers({
  companies: companyReducer,
  contacts: contactReducer,
  drivers: driverReducer,
  equipments: equipmentReducer,
  locations: locationReducer
});
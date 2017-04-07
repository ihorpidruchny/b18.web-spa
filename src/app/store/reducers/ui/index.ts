import { combineReducers } from 'redux';
import { companyReducer, ICompanyState } from './company.reducer';
import { companyContactReducer, ICompanyContactState } from './contact.reducer';
import { driverReducer, IDriverState } from './driver.reducer';
import { equipmentReducer, IEquipmentState } from './equipment.reducer';

export interface IUiState {
  companies: ICompanyState;
  contacts: ICompanyContactState;
  drivers: IDriverState;
  equipments: IEquipmentState;
}

export const uiReducer = combineReducers({
  companies: companyReducer,
  contacts: companyContactReducer,
  drivers: driverReducer,
  equipments: equipmentReducer
});

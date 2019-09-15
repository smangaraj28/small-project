export interface Role {
  roleId: number;
  roleName: string;
  hotelPOSModule: boolean;
  inventoryModule: boolean;
  roomBookModule: boolean;
  SuperMarketPOSModule: boolean;
  reportsModule: boolean;
  accountingModule: boolean;
}

export interface RoleTable {
  entityName: string;
  roleName: string;
  roleId?: number;
  roleDetails: Modules[];
}

export interface Modules {
  moduleId: number;
  moduleName: string;
  readAllFlag?: boolean;
  writeAllFlag?: boolean;
  selected?: boolean;
  moduleDescription: SubModules[];
}

export interface SubModules {
  subModuleId: number;
  subModuleName: string;
  readFlag: boolean;
  writeFlag: boolean;
}

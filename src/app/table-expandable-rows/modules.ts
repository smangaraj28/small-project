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

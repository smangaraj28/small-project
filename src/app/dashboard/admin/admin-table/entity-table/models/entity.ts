export interface Entity {
  entityId: number; // 1
  entityName: string; // 1
  entityShortName?: string; // 1
  entityCategory?: string; // 1
  entityStatus: string; // 1
  entityDescription?: string; // 2
  entityImageUrl?: string; // 2
  entityLogo?: string; // 3
  entityIndustry?: string; // 3
  entityTaxID?: string; // 3
  entityAddLine1: string; // 1
  entityAddLine2: string; // 1
  entityCity: string; // 2
  entityState: string; // 2
  entityCountry: string; // 2
  entityPinCode: number; // 2
  entityPhone: string; // 3
  entityFax: string; // 3
  entityMobile: string; // 3
  entityWebsite: string; // 4
  entityEmail: string; // 4
  entityStartDate?: string; // 5
  entityFiscalYear?: string; // 5
  entityTimeZone?: string; // 5
}

export interface Address {
  addLine1: string; // 1
  addLine2: string; // 1
  city: string; // 2
  state: string; // 2
  country: string; // 2
  pinCode: number; // 2
  phone: string; // 3
  fax: string; // 3
  mobile: string; // 3
  website: string; // 4
  email: string; // 4
}

// export interface Address {
//   entityAddLine1: string; // 1
//   entityAddLine2: string; // 1
//   entityCity: string; // 2
//   entityState: string; // 2
//   entityCountry: string; // 2
//   entityPinCode: number; // 2
//   entityPhone: string; // 3
//   entityFax: string; // 3
//   entityMobile: string; // 3
//   entityWebsite: string; // 4
//   entityEmail: string; // 4
// }

// export interface EntityBranch {
//   entityBranchId: number;
//   entityBranchName: string;
//   entityBranchCategory: string;
//   entityBranchDescription?: string;
//   entityBranchImageUrl?: string;
//   entityBranchStatus: string;
//   entityAddress?: Address;
//   entityBranchStartDate?: string;
// }

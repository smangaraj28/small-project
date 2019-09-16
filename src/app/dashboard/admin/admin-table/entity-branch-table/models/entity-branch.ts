export interface EntityBranch {
  entityName?: string;
  entityBranchId: number;
  entityBranchName: string;  // 1
  entityBranchShortName: string;
  entityBranchCategory: string;
  entityBranchDescription?: string;
  entityBranchImageUrl?: string;
  entityBranchStatus: string; // 5
  entityBranchAddLine1: string;
  entityBranchAddLine2: string;
  entityBranchCity: string;  // 2
  entityBranchState: string;
  entityBranchCountry: string;
  entityBranchPinCode: number;
  entityBranchPhone: string;
  entityBranchFax: string;
  entityBranchMobile: string;  // 3
  entityBranchWebsite: string;
  entityBranchEmail: string;
  entityBranchStartDate?: string; // 4
}

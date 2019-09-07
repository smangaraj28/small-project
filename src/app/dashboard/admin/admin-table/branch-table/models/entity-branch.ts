export interface EntityBranch {
  entityBranchId: number;
  entityBranchName: string;
  entityBranchShortName: string;
  entityBranchCategory: string;
  entityBranchDescription?: string;
  entityBranchImageUrl?: string;
  entityBranchStatus: string;
  entityBranchAddLine1: string;
  entityBranchAddLine2: string;
  entityBranchCity: string;
  entityBranchState: string;
  entityBranchCountry: string;
  entityBranchPinCode: number;
  entityBranchPhone: string;
  entityBranchFax: string;
  entityBranchMobile: string;
  entityBranchWebsite: string;
  entityBranchEmail: string;
  entityBranchStartDate?: string;
}

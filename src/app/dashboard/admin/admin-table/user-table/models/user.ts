export interface User {
  entityName?: string;
  userId?: number;
  userName: string;
  userPassword: string;
  branchRole: BranchRole[];
}

export interface BranchRole {
  branchId?: number;
  branchName: string;
  branchRole: string;
}

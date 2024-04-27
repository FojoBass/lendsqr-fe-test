interface DashSideNavOptInt {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  title: string;
}

export interface DashSideNavOptsInt {
  heading: string;
  opts: DashSideNavOptInt[];
}

export interface UsersCardsInt {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  title: string;
  count: string;
}

export interface UserInfoInt {
  personal: {
    fullName: string;
    phoneNumber: string;
    email: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: number;
    address: string;
    tier: number;
    status: 'blacklisted' | 'inactive' | 'active' | 'pending';
    organization: string;
    dateJoined: string;
  };
  educationEmployment: {
    educationLevel: string;
    employmentStatus: string;
    employmentSector: string;
    employmentDuration: number;
    email: string;
    income: number;
    loanRepayment: number;
  };
  socials: {
    x: string;
    fb: string;
    insta: string;
  };
  guarantors: {
    fullName: string;
    phoneNumber: string;
    eamil: string;
    relationship: string;
  }[];
  id: string;
}

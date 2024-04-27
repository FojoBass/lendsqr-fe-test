import {
  ActiveUsers,
  Bank,
  Briefcase,
  Chart,
  Clipboard,
  Coins,
  Fan,
  Handshake,
  LoanHand,
  LoanUsers,
  Percent,
  Piggy,
  Sack,
  SavingsUsers,
  Scroll,
  Sliders,
  Transaction,
  UserCheck,
  UserCog,
  UserFriends,
  Users,
  Users2,
  UserTimes,
} from './icons';
import { DashSideNavOptsInt, UsersCardsInt } from './types';

const dashSideNavOpts: DashSideNavOptsInt[] = [
  {
    heading: 'Customers',
    opts: [
      {
        Icon: UserFriends,
        title: 'Users',
      },
      {
        Icon: Users,
        title: 'Guarantors',
      },
      {
        Icon: Sack,
        title: 'Loans',
      },
      {
        Icon: Handshake,
        title: 'Decision Models',
      },
      {
        Icon: Piggy,
        title: 'Savings',
      },
      {
        Icon: LoanHand,
        title: 'Loan Requests',
      },
      {
        Icon: UserCheck,
        title: 'Whitelist',
      },
      {
        Icon: UserTimes,
        title: 'Karma',
      },
    ],
  },
  {
    heading: 'Business',
    opts: [
      {
        Icon: Briefcase,
        title: 'Organization',
      },
      {
        Icon: LoanHand,
        title: 'Loan Products',
      },
      {
        Icon: Bank,
        title: 'Savings Products',
      },
      {
        Icon: Coins,
        title: 'Fees and Charges',
      },
      {
        Icon: Transaction,
        title: 'Transactions',
      },
      {
        Icon: Fan,
        title: 'Services',
      },
      {
        Icon: UserCog,
        title: 'Service Account',
      },
      {
        Icon: Scroll,
        title: 'Settlements',
      },
      {
        Icon: Chart,
        title: 'Reports',
      },
    ],
  },
  {
    heading: 'Settings',
    opts: [
      {
        Icon: Sliders,
        title: 'Preferences',
      },
      {
        Icon: Percent,
        title: 'Fees and Pricing',
      },
      {
        Icon: Clipboard,
        title: 'Audit Logs',
      },
    ],
  },
];

const usersCards: UsersCardsInt[] = [
  {
    count: '2453',
    Icon: Users2,
    title: 'users',
  },
  {
    count: '2453',
    Icon: ActiveUsers,
    title: 'active users',
  },
  {
    count: '12453',
    Icon: LoanUsers,
    title: 'users with loans',
  },
  {
    count: '102453',
    Icon: SavingsUsers,
    title: 'users with savings',
  },
];

const regex = {
  numeric: /^\d+$/,
  alpha: /^[A-Za-z\s]+$/,
  alphaNumberic: /^[a-zA-Z0-9]+$/,
  email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
};

export { regex, dashSideNavOpts, usersCards };

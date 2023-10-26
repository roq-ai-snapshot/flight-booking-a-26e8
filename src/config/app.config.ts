interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Flight Booker'],
  tenantRoles: ['Business Owner', 'Travel Agent'],
  tenantName: 'Airline',
  applicationName: 'Flight Booking Application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage flight bookings',
    'View flight details',
    'View passenger details',
    'Manage own user details',
  ],
  ownerAbilities: ['Manage user information', 'Manage airlines', 'Manage flights', 'Manage bookings'],
  getQuoteUrl: 'https://app.roq.ai/proposal/1be7dbbe-b2c5-49e9-8bca-50f7085d5820',
};

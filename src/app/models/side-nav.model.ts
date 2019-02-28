import { RolesEnum } from './roles.enum';

export interface SideNavItem {
  route: string;
  icon: string;
  name: string;
  requiredRole: RolesEnum;
  children?: SideNavItem[];
}

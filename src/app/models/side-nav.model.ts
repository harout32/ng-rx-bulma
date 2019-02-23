export interface SideNavItem {
  route: string;
  icon: string;
  name: string;
  adminRequired: boolean;
  children?: SideNavItem[];
}

import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface SidebarItemType {
  path: string;
  text: string;
  authOnly?: boolean;
}

export const NavbarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Главная'
  },
  {
    path: RoutePath.profile,
    text: 'Профиль',
    authOnly: true
  },
];
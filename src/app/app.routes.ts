export enum AppRoute {
  AUTH = '',
  LOGIN = 'login',
  REGISTRATION = 'registration',
  CHAT = 'chat',
}

export const appRoutes = {
  AUTH: `${AppRoute.AUTH}`,
  LOGIN: `${AppRoute.AUTH}${AppRoute.LOGIN}`,
  REGISTRATION: `${AppRoute.AUTH}${AppRoute.REGISTRATION}`,
  CHAT: `${AppRoute.CHAT}`,
};

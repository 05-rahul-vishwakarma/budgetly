/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/bank-intro` | `/(auth)/bank-select` | `/(auth)/otp` | `/(auth)/permissions` | `/(auth)/phone` | `/(auth)/profile` | `/(auth)/welcome` | `/(tabs)` | `/(tabs)/` | `/(tabs)/analytics` | `/(tabs)/budget` | `/(tabs)/settings` | `/(tabs)/transactions` | `/_sitemap` | `/analytics` | `/bank-intro` | `/bank-select` | `/budget` | `/otp` | `/permissions` | `/phone` | `/profile` | `/settings` | `/settings/appearance` | `/settings/banks` | `/settings/budgets` | `/settings/categories` | `/settings/contact` | `/settings/data` | `/settings/delete-account` | `/settings/feedback` | `/settings/help` | `/settings/notifications` | `/settings/privacy` | `/settings/security` | `/settings/terms` | `/transactions` | `/welcome`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}

# Codebase Overview

This codebase is a React Native application that uses Supabase for authentication and state management with Redux. The application has a tab-based navigation for authenticated users and a stack-based navigation for authentication screens.

## Navigation

The application uses react-navigation for managing navigation. There are two main navigators:

1. AuthStackNavigator: This is used when the user is not authenticated. It includes LoginScreen and RegisterScreen.

2. MainStackNavigator: This is used when the user is authenticated. It includes a MainTabsNavigator which further includes DashboardScreen and MyTasksScreen.

The NavigationStack component decides which navigator to render based on whether the user is authenticated or not.

## Authentication

The application uses Supabase for authentication. The supabase client is created in the Utils directory.

The LoginScreen and RegisterScreen components dispatch actions to sign in and sign up the user respectively.

## State Management

The application uses Redux for state management. The Redux store is created in the Redux directory and provided to the application in App.tsx.

## Styling

The application uses react-native-paper for theming and components. Custom fonts are loaded in App.tsx.

## Screens

The application includes the following screens:

1. LoginScreen: Allows the user to sign in.
2. RegisterScreen: Allows the user to sign up.
3. DashboardScreen: The main screen for authenticated users.
4. MyTasksScreen: A screen for authenticated users to view their tasks.

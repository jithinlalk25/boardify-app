import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { tokenStorage } from "./src/utils/tokenStorage";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { NoticeDetailScreen } from "./src/screens/NoticeDetailScreen";

const Stack = createNativeStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#006400",
    secondary: "#4CAF50",
  },
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await tokenStorage.getToken();
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLoginSuccess = async (token: string) => {
    await tokenStorage.saveToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await tokenStorage.removeToken();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return null; // Or return a loading spinner component
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => (
                <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Home" }}
              />
              <Stack.Screen name="Profile" options={{ title: "My Profile" }}>
                {(props) => (
                  <ProfileScreen {...props} onLogout={handleLogout} />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="NoticeDetail"
                component={NoticeDetailScreen}
                options={{ title: "Notice Details" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

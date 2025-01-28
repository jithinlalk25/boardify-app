import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { api, UserProfile } from "../services/api";
import { tokenStorage } from "../utils/tokenStorage";

type ProfileScreenProps = {
  onLogout: () => Promise<void>;
  navigation: any; // Or use proper navigation type
  route: any; // Or use proper route type
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onLogout,
  navigation,
  route,
}) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await tokenStorage.getToken();
      if (!token) {
        setError("Not authenticated");
        return;
      }
      const data = await api.getUserProfile(token);
      setProfile(data);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text variant="bodyLarge" style={styles.error}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Profile
      </Text>
      {profile && (
        <View style={styles.profileInfo}>
          <Text variant="bodyLarge">Email: {profile.email}</Text>
          <Text variant="bodyLarge">Type: {profile.type}</Text>
          <Text variant="bodyLarge">Institute ID: {profile.instituteId}</Text>
          <Text variant="bodyMedium">Member ID: {profile._id}</Text>
          <Text variant="bodySmall">
            Joined: {new Date(profile.createdAt).toLocaleDateString()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  profileInfo: {
    gap: 12,
  },
  error: {
    color: "red",
  },
});

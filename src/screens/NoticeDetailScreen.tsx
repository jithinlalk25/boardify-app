import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Notice } from "../types/notice";
import { api } from "../services/api";

type RootStackParamList = {
  NoticeDetail: { noticeId: string };
};

type NoticeDetailRouteProp = RouteProp<RootStackParamList, "NoticeDetail">;

export const NoticeDetailScreen = () => {
  const route = useRoute<NoticeDetailRouteProp>();
  const [notice, setNotice] = React.useState<Notice | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await api.getNoticeById(route.params.noticeId);
        setNotice(data);
      } catch (error) {
        console.error("Error fetching notice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [route.params.noticeId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!notice) {
    return (
      <View style={styles.container}>
        <Text>Notice not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        {notice.title}
      </Text>
      <Text variant="bodyLarge" style={styles.description}>
        {notice.description}
      </Text>
      <View style={styles.metadata}>
        <Text variant="bodyMedium">
          Created: {new Date(notice.createdAt).toLocaleDateString()}
        </Text>
        <Text variant="bodyMedium">
          Updated: {new Date(notice.updatedAt).toLocaleDateString()}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 24,
  },
  metadata: {
    gap: 8,
  },
});

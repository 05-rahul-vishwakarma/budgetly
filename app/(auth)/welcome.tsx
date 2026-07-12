"use client";

import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { cn } from "@/utils";
import { colors } from "@/constants/colors";
import {
  ArrowRight,
  Shield,
  Zap,
  Smartphone,
  CreditCard,
  TrendingUp,
} from "lucide-react-native";

const features = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    desc: "Your data is encrypted and never shared",
  },
  {
    icon: Zap,
    title: "Instant Sync",
    desc: "Real-time transactions from all your banks",
  },
  {
    icon: Smartphone,
    title: "Smart Categorization",
    desc: "AI automatically categorizes your spending",
  },
  {
    icon: TrendingUp,
    title: "Actionable Insights",
    desc: "Get personalized tips to save more",
  },
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>💰</Text>
          </View>
          <Text style={styles.title}>AI Financial Copilot</Text>
          <Text style={styles.subtitle}>
            Take control of your finances with AI-powered insights
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <feature.icon size={24} color="#10B981" />
              </View>
              <View style={styles.featureContainer}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text
                  numberOfLines={2}
                  style={styles.featureDesc}
                >
                  {feature.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => router.push("/(auth)/phone")}
          style={styles.getStartedButton}
          android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
          <ArrowRight size={20} color="#fff" />
        </Pressable>

        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    fontSize: 40,
  },
featureContainer: {
  display: "flex",
  flexDirection: "column",
  flex: 1,
},
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#09090B",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#71717A",
    textAlign: "center",
    lineHeight: 24,
  },
  featuresContainer: {
    gap: 16,
    marginBottom: 40,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#09090B",
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: "#71717A",
    lineHeight: 20,
  },
  getStartedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#10B981",
    marginBottom: 24,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  termsText: {
    fontSize: 12,
    color: "#71717A",
    textAlign: "center",
    lineHeight: 18,
  },
  link: {
    color: "#10B981",
    fontWeight: "500",
  },
});

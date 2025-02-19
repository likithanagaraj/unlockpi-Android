import React from "react";
import { Alert, StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/authContext";
import Navbar from "../../components/home/Navbar";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { theme } from "../../utils/theme";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    // Show a fallback UI while user details are being loaded
    return (
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 50 }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Loading Profile...</Text>
      </View>
    );
  }

  // Derive username from email
  const username = user.email.split("@")[0];
  const userName = username.charAt(0).toUpperCase() + username.slice(1);

  return (
   
      <View >
      <Ionicons
        name="person-circle-sharp"
        size={100}
        color="white"
        style={{ alignSelf: "center" }}
      />
      <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold",color:theme.darktext,fontFamily:" Geist-Bold" }}>
      {userName}
      </Text>
      <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "400",color:theme.darktext,fontFamily:" Geist" }}>{user.email}</Text>
      <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "500" ,color:theme.darktext,fontFamily:" Geist-Bold"}}>
        You're a Premium User 🔥
      </Text>
    </View>
    
  );
};

const ButtonComponent = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logout(); // Clear token
            router.push("/"); // Redirect to login screen
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ gap: 8 }}>
      <Button
        textColor={theme.darktext}
        labelStyle={{ fontFamily:" Geist-Bold" }}
        mode="contained"
        style={{
          borderWidth: 1,
          backgroundColor: theme.cardbg,
          borderColor: theme.bordercolor,
          borderRadius: 8,
          
        }}
        onPress={() => console.log("Pressed")}
      >
        Change Password
      </Button>
      <Button
        textColor={theme.darktext}
        labelStyle={{ fontFamily:" Geist-Bold" }}
        mode="contained"
        style={{
          borderWidth: 1,
          backgroundColor: theme.cardbg,
          borderColor: theme.bordercolor,
          borderRadius: 8,
          
        }}
        onPress={() => console.log("Pressed")}
      >
        Settings
      </Button>
      <Button
        mode="contained"
        textColor="white"
        labelStyle={{ fontFamily:" Geist-Bold" }}
        style={{ backgroundColor: "#DC2626", borderRadius: 8 }}
        onPress={handleLogout} // Updated to call handleLogout directly
      >
        Logout
      </Button>
    </View>
  );
};

const index = () => {
  return (
    <ProtectedRoute>
      <ScrollView style={{backgroundColor:theme.darkbackground}}  stickyHeaderHiddenOnScroll={true}>
        <Navbar>Profile</Navbar>
        <View style={styles.mainContainer}>
          <View style={{ gap: 30 }}>
            <Profile />
            <ButtonComponent />
          </View>
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    height:615
  },
});

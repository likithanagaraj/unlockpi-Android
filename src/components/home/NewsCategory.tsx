import { Pressable, StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { theme } from "../../utils/theme";

const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_WIDTH = (SCREEN_WIDTH - 60) / 2; // Account for padding and gap

interface CategoryButtonProps {
  title: string;
  isWide?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  slug: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  title,
  isWide = false,
  icon,
  slug
}) => {
  return (
    <Pressable
    onPress={()=>router.push(`/(category)/${slug}`)}
      style={[
        styles.categoryButton,
        isWide && styles.wideButton,
        // Add shadow for elevation
        Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          android: {
            elevation: 4,
          },
        }),
      ]}
    >
      <View style={styles.buttonContent}>
      <Text style={styles.buttonText}>{title}</Text>
        <Ionicons name={icon} size={20} color="white" style={styles.icon} />
       
      </View>
      {/* <Ionicons name="chevron-forward" size={20} color="white" /> */}
    </Pressable>
  );
};

const NewsCategory = () => {
  const categories: { title: string; icon: keyof typeof Ionicons.glyphMap; isWide?: boolean }[] = [
    { title: "Art & Music", icon: "musical-notes" },
    { title: "Sports", icon: "football" },
    { title: "Business", icon: "business" },
    { title: "Startups", icon: "rocket" },
    { title: "Technology", icon: "hardware-chip" },
    { title: "Science", icon: "flask" },
    { title: "Explore", icon: "chevron-forward", isWide: true },
  ];

  return (
    <View className="" style={styles.container}>
      {/* <Text style={styles.headerText}>News Categories</Text> */}
    
     <View style={styles.gridContainer}>
        {categories.map((category, index) => (
          
          <CategoryButton
          
          slug ={category.title}
            key={index}
            title={category.title}
            icon={category.icon}
            isWide={category.isWide}
          />
        ))
        }
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    // padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 16,
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    // justifyContent: 'space-between',
    gap: 8,
  },
  categoryButton: {
    backgroundColor: theme.cardbg,
    borderRadius: 8,
    padding: 16,
    width: "48.5%",
    marginBottom: 4,
    borderColor: theme.bordercolor,
    borderWidth: 1,
  },
  wideButton: {
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    fontFamily:"Geist-Medium"
  },
});

export default NewsCategory;
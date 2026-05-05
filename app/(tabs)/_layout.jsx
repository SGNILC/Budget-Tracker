import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for better cross-platform consistency
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { colors } from '../../constants/themes';
import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // The color of the icon and text when selected
        tabBarActiveTintColor: colors.activeBlue,
        // The color when NOT selected
        tabBarInactiveTintColor: colors.gray,
        
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0, // Removes the ugly line at the top of the bar
          elevation: 10, // Shadow for Android
          shadowColor: '#000', // Shadow for iOS
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: Platform.OS === 'ios' ? 90 : 80, // Extra height for a premium feel
          paddingBottom: Platform.OS === 'ios' ? 30 : 12,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      
      <Tabs.Screen
        name="Add_Transaction"
        options={{
          title: 'Add Transaction',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "add-circle" : "add-circle-outline"} 
              size={28} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Transaction_List"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "reorder-four" : "reorder-four"} 
              size={28} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "settings" : "settings-outline"} 
              size={28} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
      name="app\modal\camera.jsx"  
      options={{
        href: null,  
        headerShown: false,
      }}
    />
    </Tabs>
    
  );
}
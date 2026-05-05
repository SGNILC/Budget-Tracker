import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}> 
        {/* ^ Setting it here kills headers for EVERYTHING by default */}
        
        <Stack.Screen name="(tabs)" />

        {/* If your file is at app/modal/camera.jsx, 
          the name here must be "modal/camera" 
        */}
        <Stack.Screen 
          name="modal/camera" 
          options={{ 
            presentation: 'modal', 
            headerShown: false, // Explicitly double-checking it's hidden
            animation: 'slide_from_bottom'
          }} 
        />

        <Stack.Screen name='Settings' />
      </Stack>
      
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import {Drawer} from "expo-router/drawer";
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import axios from "axios";
import { useState, useEffect } from "react";
import { MenuProvider } from "../context/MenuContext";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [menuid, setMenuId] = useState(null);

  const [alltutorial, setAllTutorial] = useState([]);

  const getAllTutorial = async () => {
    try {
      const { data } = await axios.get(
        "http://10.130.120.55:8090/api/v1/tutorial/get-tutorial"
      );

      console.log("API Response:", data);

      if (data.success) {
        setAllTutorial(data.tutorial);
      }

    } catch (error) {
      console.log(error);
    }
  }; 
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <MenuProvider>
      <AnimatedSplashOverlay />
        <Drawer>
        <Drawer.Screen
        name='index'
        options={{
          title:"Home",
          drawerLabel: "Home"
        }}
        />
      </Drawer>
      </MenuProvider>
    </ThemeProvider>
  );
}

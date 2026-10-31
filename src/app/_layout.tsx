import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="Home"
        options={{
          title: "Tutorial App",
          drawerLabel: "Home",
        }}
      />

      <Drawer.Screen
        name="Explore"
        options={{
          title: "Explore",
          drawerLabel: "Explore",
        }}
      />

      <Drawer.Screen
        name="About"
        options={{
          title: "About",
          drawerLabel: "About",
        }}
      />

      <Drawer.Screen
        name="Profile"
        options={{
          title: "Profile",
          drawerLabel: "Profile",
        }}
      />

      <Drawer.Screen
        name="Setting"
        options={{
          title: "Setting",
          drawerLabel: "Setting",
        }}
      />
    </Drawer>
  );
}

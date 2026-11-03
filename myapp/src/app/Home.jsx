import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { useMenu } from "../context/MenuContext";

const Home = () => {
  const [menu, setMenu] = useState([]);
  const { setMenuId } = useMenu();
  

  const getAllMenu = async () => {
    try {
      const { data } = await axios.get(
        "http://10.130.120.55:8090/api/v1/menu/get-menu"
      );

      console.log("API Response:", data);

      if (data.success) {
        setMenu(data.menu);
      }

    } catch (error) {
      console.log("Menu fetching error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllMenu();
  }, []);

  const openMenuDrawer = (item) => {
    setMenuId(item.menu_id);
    console.log("item id",item.menu_id)
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize:25, fontWeight:800, padding: 10}}>All languages</Text>
      <FlatList
        data={menu}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item) => String(item.menu_id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cardBtn} onPress={() => openMenuDrawer(item)}>
            <View style={styles.card}>
            <Image
              source={{
                uri: `data:${item.menu_icon.contentType};base64,${item.menu_icon.data}`
              }}
              style={{ height: 100, width: 100 }}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardBtn: {
    backgroundColor: "rgba(108, 196, 31, 0.53)",
    width: "48%",
    padding: 10,
    borderRadius: 10,
    justifyContent:"center",
    alignItems:"center",
  },
  card: {
    // backgroundColor: "rgba(216, 224, 209, 0.53)",
    // width: "48%",
    // padding: 20,
    // marginBottom: 10,
    // borderRadius: 10,
    // justifyContent:"center",
    alignItems:"center",
     paddingVertical: 23,
  },
  title: {
    fontSize:20,
    fontWeight: 800,
    paddingVertical:5,
    color:"white"
  }
});

export default Home;
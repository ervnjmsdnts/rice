import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");
      return user !== null ? setCurrentUser(JSON.parse(user)) : null;
    })();
  }, []);

  useEffect(() => {
    (() => {
      if (Object.keys(currentUser)) {
        const { role } = currentUser;
        if (role === "employee") return navigation.navigate("EmployeeStack");
        if (role === "cooperative") return navigation.navigate("Cooperative");
        if (role === "admin") return navigation.navigate("Admin");
      }
    })();
  }, [currentUser]);

  const setUser = async (value) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(value));
      setCurrentUser(value);
    } catch (e) {
      console.log("Set: ", e);
    }
  };

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      return user !== null ? setCurrentUser(JSON.parse(user)) : null;
    } catch (e) {
      console.log("Get: ", e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser({});
    } catch (e) {
      console.log("Del: ", e);
    }
  };

  const value = useMemo(
    () => ({ currentUser, setUser, getUser, logout }),
    [currentUser, setUser, getUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

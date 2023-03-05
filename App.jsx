import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthProvider from "./context/AuthContext";
import AdminDrawer from "./Navigator/Admin/AdminDrawer";
import EmployeeStack from "./Navigator/Employee/EmployeeStack";
import CooperativeOperationsScreen from "./screens/CooperativeOperationsScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Admin" component={AdminDrawer} />
          <Stack.Screen name="EmployeeStack" component={EmployeeStack} />
          <Stack.Screen
            name="Cooperative"
            component={CooperativeOperationsScreen}
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;

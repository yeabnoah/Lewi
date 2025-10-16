import { SignIn } from "@/components/sign-in";
import { View } from "react-native";

const Login = () => {
  return (
    <View className="flex h-screen justify-center items-center">
      <SignIn />
    </View>
  );
};

export default Login;

import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  role: string;
  accountId: string;
  username: string;
  userId: string;
}

const getRole = async (token: string): Promise<string> => {
  return new Promise(async (resovle, reject) => {
    try {
      const decodedToken = jwtDecode<MyJwtPayload>(token);
      const role = decodedToken.role;
      resovle(role);
    } catch (error) {
      console.error("Login error:", error);
    }
  });
};

export default getRole;

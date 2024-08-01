import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  role: string;
  accountId: string;
  username: string;
  userId: string;
}

const getRole = (token: string): string => {
  const decodedToken = jwtDecode<MyJwtPayload>(token);
  const role = decodedToken.role;
  return role;
};

const getUserId = (token: string): string => {
  const decodedToken = jwtDecode<MyJwtPayload>(token);
  const userId = decodedToken.userId;
  return userId;
};

const getUsername = (token: string): string => {
  const decodedToken = jwtDecode<MyJwtPayload>(token);
  const username = decodedToken.username;
  return username;
};

const getAccountId = (token: string): string => {
  const decodedToken = jwtDecode<MyJwtPayload>(token);
  const accountId = decodedToken.accountId;
  return accountId;
};


export { getRole, getUserId, getAccountId };

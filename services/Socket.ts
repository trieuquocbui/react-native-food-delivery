import { url } from "@/helpers/BaseUrlHelper";
import { io } from "socket.io-client";

export const socket = io(url);

socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("disconnect", () => {});

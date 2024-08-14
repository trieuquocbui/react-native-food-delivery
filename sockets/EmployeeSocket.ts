import { employeeUrl } from "@/helpers/BaseUrlHelper";
import { io } from "socket.io-client";

const socket = io(employeeUrl);

console.log(socket.connected);

export default socket;

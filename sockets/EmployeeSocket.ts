import { employeeUrl } from "@/helpers/BaseUrlHelper";
import { io } from "socket.io-client";

const socket = io(employeeUrl);

export default socket;
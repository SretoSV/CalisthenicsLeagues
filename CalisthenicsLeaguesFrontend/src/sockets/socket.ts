import * as signalR from "@microsoft/signalr";
import { serverPath } from "../functions/serverpath";

const socket = new signalR.HubConnectionBuilder()
    .withUrl(`${serverPath()}ws`)
    .withAutomaticReconnect()
    .build();

export default socket;
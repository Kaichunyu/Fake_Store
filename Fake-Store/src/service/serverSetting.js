import { Platform } from "react-native";

export const port = 3000;

export const server = Platform.OS === "android" ? "http://10.0.2.2" : "http://localhost";

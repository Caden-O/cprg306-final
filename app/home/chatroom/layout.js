import { AuthContextProvider } from "../../_utils/auth-context.js";
 
export default function Layout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
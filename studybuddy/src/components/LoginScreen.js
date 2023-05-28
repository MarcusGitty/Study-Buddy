import { Container } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabase";
import Logo from "../Logo.png"

export default function LoginScreen() {
  return (
    <Container maxWidth="xs" sx={{ height: "100vh", justifyContent: "center" }}>
      <img src ={Logo} alt='Our app logo'/>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    </Container>
  );
}

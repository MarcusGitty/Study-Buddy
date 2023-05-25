import { Container } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabase";

export default function LoginScreen() {
  return (
    <Container maxWidth="xs" sx={{ height: "100vh", justifyContent: "center" }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    </Container>
  );
}

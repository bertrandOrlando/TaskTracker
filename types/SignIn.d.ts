type SignInResponse = {
  user: { id: string; name: string; email: string; image: string };
  account: {
    provider: string;
    type: string;
    providerAccountId: string;
    access_token: string;
    expires_at: number;
    scope: string;
    token_type: string;
    id_token: string;
  };
  profile: {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number;
    exp: number;
  };
};

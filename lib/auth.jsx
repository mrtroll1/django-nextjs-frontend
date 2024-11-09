const { cookies } = require("next/headers")

const TOKEN_AGE = 3600;
const TOKEN_NAME = "auth-token";
const TOKEN_REFRESH_NAME = "auth-refresh-token";

export async function getToken() {
   // for any api requests
   const myAuthToken = (await cookies()).get(TOKEN_NAME)
   return myAuthToken?.value
}

export async function getRefreshToken() {
   const myAuthToken = (await cookies()).get(TOKEN_REFRESH_NAME)
   return myAuthToken?.value
}

export async function setToken(authToken) {
   // for login
   (await cookies()).set({
      name: TOKEN_NAME,
      value: authToken,
      httpOnly: true, // limit client-side JS
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: TOKEN_AGE
  })
}

export async function setRefreshToken(authToken) {
   // for login
   (await cookies()).set({
      name: TOKEN_REFRESH_NAME,
      value: authToken,
      httpOnly: true, // limit client-side JS
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: TOKEN_AGE
  })
}

export async function deleteTokens() {
   // for logout
  (await cookies()).delete(TOKEN_NAME);
  (await cookies()).delete(TOKEN_REFRESH_NAME);
}
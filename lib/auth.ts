import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";


//* hashPassword
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
    }

//* comparePassword
export const comparePassword = async (password: string, receivedPassword: string) => {
    return bcrypt.compare(password, receivedPassword);
    }    

// * generateToken
export const createJWT = (user:any) => {
  // return jwt.sign({ id: user.id }, 'cookies')
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};    

// * validateToken
export const validateJWT = async (jwt:string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.payload as any;
};

// * getUserFromCookie
export const getUserFromCookie = async (cookies:any) => {
  cookies = cookies || {};
  const jwt = cookies.get("token");

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};
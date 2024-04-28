import { jwtVerify, SignJWT } from "jose";

export async function CreateToken(email, id) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const payload = { email: email, id: id };
  let token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // jwt HS256 algorithm use kore encode kora hocche
    .setIssuedAt() //jwt kokhon set kora hocche
    .setIssuer(process.env.JWT_ISSUER) // kon url e set kora hocche
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME) //koto somoy porjonto amader jwt enable thakbe
    .sign(secret);
  return token;
}

export async function VerifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const decoded = await jwtVerify(token, secret);
  return decoded["payload"];
}

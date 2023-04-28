import jwt from "jsonwebtoken";
import crypto from "crypto";

const secret = "123_abc";
const payload = { foo: "bar" };

const encodedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const signAndVerifyWithJwonwebTokenLib = ({
  payload,
  secret,
}: {
  payload: any;
  secret: string;
}) => {
  const signature = jwt.sign(payload, secret, { algorithm: "HS256" });
  console.log("signature ", signature);
  // verifies by creating the same sign and comparing with bufferEqual
  const decoded = jwt.verify(signature, secret);
  console.log("decoded ", decoded);
};

function toBase64(thing) {
  return Buffer.from(thing).toString("base64");
}

function fromBase64(base64) {
  return Buffer.from(base64, "base64").toString("utf-8");
}

const jwtParser = (jsonToken: string) => {
  const [header64, payload64, signature64] = jsonToken.split(".");

  return {
    header: JSON.parse(fromBase64(header64)),
    payload: JSON.parse(fromBase64(payload64)),
    signature: fromBase64(signature64),
  };
};

const signPayloadWithSecretCustom = ({
  payload,
  secret,
}: {
  payload: any;
  secret: string;
}) => {
  const normalized = toBase64(Buffer.from(JSON.stringify(payload)));
  const secretKey = crypto.createSecretKey(Buffer.from(secret));
  const hmac = crypto.createHmac("SHA256", secretKey);
  hmac.update(normalized);
  const sign = hmac.digest("base64");
  return sign;
};

const encodeAndDecodeString = (text: string) => {
  const encoded = toBase64(text);
  console.log(encoded);

  const decoded = fromBase64(encoded);

  console.log(decoded);
};

(function main() {
  encodeAndDecodeString("Text");

  // md5sum package.json
  // bfbb6eec9b416a208cc9d2ed11df76cc  package.json
})();

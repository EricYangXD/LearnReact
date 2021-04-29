import JSEncrypt from 'jsencrypt';
// 公钥
export const publicKey = `1234567890`;

export default function encrypt(value, key = publicKey) {
  const jsEncrypt = new JSEncrypt({});
  jsEncrypt.setPublicKey(key);

  return jsEncrypt.encrypt(value);
}

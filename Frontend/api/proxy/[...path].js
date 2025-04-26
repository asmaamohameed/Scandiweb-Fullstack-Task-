import axios from 'axios';
import crypto from 'crypto';

export default async (req, res) => {
  // 1. Decrypt the ByetHost cookie
  const key = Buffer.from(process.env.AES_KEY || 'f655ba9d09a112d4968c63579db590b4', 'hex');
  const iv = Buffer.from(process.env.AES_IV || '98344c2eee86c3994890592585b49f80', 'hex');
  const encrypted = Buffer.from(process.env.AES_ENCRYPTED_DATA || 'f3ea5896764379966e4c9bba3da12850', 'hex');

  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  const cookieValue = decrypted.toString('hex');

  // 2. Forward the request to ByetHost
  try {
    const response = await axios({
      method: req.method,
      url: `http://scandiwebtask.byethost31.com${req.url.replace('/api/proxy', '')}`,
      headers: {
        ...req.headers,
        Cookie: `__test=${cookieValue}`,
      },
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Proxy request failed" });
  }
};
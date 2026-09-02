import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PublisherService from "../../../../services/publisher";
import crypto from "crypto";

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const publisherService: PublisherService = req.scope.resolve("publisherService");
  const { email, password } = req.body as any;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const publisher = await publisherService.authenticate(email, password);

    if (!publisher) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    // Generate cryptographic HMAC-SHA256 signed session token with expiry
    const secret = process.env.JWT_SECRET || "medusa_secure_secret_2026";
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
    const payload = Buffer.from(
      JSON.stringify({
        sub: publisher.id,
        email: publisher.email,
        handle: publisher.handle,
        role: "publisher",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days validity
      })
    ).toString("base64url");
    const signature = crypto
      .createHmac("sha256", secret)
      .update(`${header}.${payload}`)
      .digest("base64url");
    const token = `${header}.${payload}.${signature}`;

    res.status(200).json({
      message: "Publisher authenticated successfully",
      publisher,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Authentication error",
      error: error.message,
    });
  }
}

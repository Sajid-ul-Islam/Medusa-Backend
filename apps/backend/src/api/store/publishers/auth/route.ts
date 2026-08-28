import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PublisherService from "../../../../services/publisher";

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

    res.status(200).json({
      message: "Publisher authenticated successfully",
      publisher,
      token: "pub_token_" + Buffer.from(email).toString("base64"),
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Authentication error",
      error: error.message,
    });
  }
}


import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PublisherService from "../../../services/publisher";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const publisherService: PublisherService = req.scope.resolve("publisherService");

  try {
    const publishers = await publisherService.list();
    res.status(200).json({ publishers });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to retrieve publishers",
      error: error.message,
    });
  }
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const publisherService: PublisherService = req.scope.resolve("publisherService");
  const { name, email, password, store_name, description, location } = req.body as any;

  if (!name || !email || !store_name) {
    res.status(400).json({
      message: "Name, email, and store_name are required.",
    });
    return;
  }

  try {
    const existing = await publisherService.retrieveByEmail(email);
    if (existing) {
      res.status(409).json({ message: "Publisher email already registered." });
      return;
    }

    const publisher = await publisherService.register({
      name,
      email,
      password,
      store_name,
      description,
      location,
    });

    res.status(201).json({ publisher });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to register publisher",
      error: error.message,
    });
  }
}


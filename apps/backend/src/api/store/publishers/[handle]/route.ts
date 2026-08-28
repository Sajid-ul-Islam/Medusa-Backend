import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PublisherService from "../../../../services/publisher";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const publisherService: PublisherService = req.scope.resolve("publisherService");
  const { handle } = req.params;

  try {
    let publisher = await publisherService.retrieveByHandle(handle);
    if (!publisher) {
      publisher = await publisherService.retrieve(handle);
    }

    if (!publisher) {
      res.status(404).json({ message: "Publisher not found" });
      return;
    }

    res.status(200).json({ publisher });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to retrieve publisher details",
      error: error.message,
    });
  }
}


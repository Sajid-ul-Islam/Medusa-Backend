import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BkashService from "../../../../services/bkash";
import SSLCommerzService from "../../../../services/sslcommerz";

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const { provider, paymentID, trxID, val_id } = req.body as {
    provider: string;
    paymentID?: string;
    trxID?: string;
    val_id?: string;
  };

  try {
    if (provider === "bkash") {
      const bkashService: BkashService = req.scope.resolve("bkashService");
      const verified = await bkashService.executePayment(
        paymentID || "TRX_BKASH_MOCK",
        trxID
      );

      res.status(200).json({
        success: true,
        provider: "bkash",
        verified,
      });
      return;
    }

    if (provider === "sslcommerz") {
      const sslcommerzService: SSLCommerzService = req.scope.resolve("sslcommerzService");
      const verified = await sslcommerzService.validateTransaction(
        val_id || "VAL_MOCK_123",
        trxID || "TRX_MOCK_123"
      );

      res.status(200).json({
        success: true,
        provider: "sslcommerz",
        verified,
      });
      return;
    }

    // Default manual/instant verification
    res.status(200).json({
      success: true,
      provider: provider || "manual",
      status: "COMPLETED",
      verifiedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to verify transaction",
      error: error.message,
    });
  }
}

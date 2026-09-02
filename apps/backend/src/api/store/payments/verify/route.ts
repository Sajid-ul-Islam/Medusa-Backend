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

  if (!provider) {
    res.status(400).json({
      success: false,
      message: "Payment provider identifier is required.",
    });
    return;
  }

  try {
    if (provider === "bkash") {
      if (!paymentID && !trxID) {
        res.status(400).json({
          success: false,
          message: "bKash paymentID or trxID required for verification.",
        });
        return;
      }
      const bkashService: BkashService = req.scope.resolve("bkashService");
      const verified = await bkashService.executePayment(
        paymentID || "TRX_BKASH_DEFAULT",
        trxID
      );

      res.status(200).json({
        success: Boolean(verified),
        provider: "bkash",
        status: verified ? "COMPLETED" : "FAILED",
        verified,
      });
      return;
    }

    if (provider === "sslcommerz") {
      if (!val_id && !trxID) {
        res.status(400).json({
          success: false,
          message: "SSLCommerz val_id or trxID required for verification.",
        });
        return;
      }
      const sslcommerzService: SSLCommerzService = req.scope.resolve("sslcommerzService");
      const verified = await sslcommerzService.validateTransaction(
        val_id || "",
        trxID || ""
      );

      res.status(200).json({
        success: Boolean(verified),
        provider: "sslcommerz",
        status: verified ? "COMPLETED" : "FAILED",
        verified,
      });
      return;
    }

    if (provider === "cod" || provider === "manual") {
      res.status(200).json({
        success: true,
        provider: "cash_on_delivery",
        status: "PENDING_DELIVERY",
        message: "Order placed under Cash on Delivery. Payment to be collected upon doorstep delivery.",
        verifiedAt: new Date().toISOString(),
      });
      return;
    }

    // Reject unknown or unrecognized payment providers
    res.status(422).json({
      success: false,
      message: `Unsupported payment provider: ${provider}`,
      status: "REJECTED",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to verify transaction",
      error: error.message,
    });
  }
}

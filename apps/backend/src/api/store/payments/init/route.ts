import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BkashService from "../../../../services/bkash";
import SSLCommerzService from "../../../../services/sslcommerz";

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const { provider, amount, invoice_number, customer } = req.body as {
    provider: string;
    amount: number;
    invoice_number: string;
    customer?: {
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      city?: string;
    };
  };

  try {
    if (provider === "bkash") {
      const bkashService: BkashService = req.scope.resolve("bkashService");
      const paymentData = await bkashService.createPayment({
        amount,
        invoice_number: invoice_number || "INV_" + Date.now(),
        payer_reference: customer?.phone,
      });

      res.status(200).json({
        success: true,
        provider: "bkash",
        paymentData,
      });
      return;
    }

    if (provider === "sslcommerz") {
      const sslcommerzService: SSLCommerzService = req.scope.resolve("sslcommerzService");
      const sessionData = await sslcommerzService.initSession({
        total_amount: amount,
        currency: "BDT",
        tran_id: invoice_number || "TRX_" + Date.now(),
        cus_name: customer?.name || "Valued Customer",
        cus_email: customer?.email || "customer@example.com",
        cus_phone: customer?.phone || "01700000000",
        cus_add1: customer?.address || "Dhaka, Bangladesh",
        cus_city: customer?.city || "Dhaka",
        cus_country: "Bangladesh",
      });

      res.status(200).json({
        success: true,
        provider: "sslcommerz",
        sessionData,
      });
      return;
    }

    // Default manual/instant handler
    res.status(200).json({
      success: true,
      provider: provider || "manual",
      trxId: "TRX_" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to initialize payment gateway session",
      error: error.message,
    });
  }
}

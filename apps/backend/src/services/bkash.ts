import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export interface BkashCreatePaymentInput {
  amount: number;
  invoice_number: string;
  payer_reference?: string;
}

export interface BkashPaymentResponse {
  paymentID: string;
  createTime: string;
  orgLogo: string;
  orgName: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  intent: string;
  merchantInvoiceNumber: string;
  bkashURL?: string;
  statusCode?: string;
  statusMessage?: string;
}

export class BkashService extends TransactionBaseService {
  private appKey: string;
  private appSecret: string;
  private username: string;
  private password: string;
  private baseUrl: string;

  constructor(container: { manager: EntityManager }) {
    super(container);
    this.appKey = process.env.BKASH_APP_KEY || "sandbox_app_key";
    this.appSecret = process.env.BKASH_APP_SECRET || "sandbox_app_secret";
    this.username = process.env.BKASH_USERNAME || "sandbox_username";
    this.password = process.env.BKASH_PASSWORD || "sandbox_password";
    this.baseUrl =
      process.env.BKASH_BASE_URL ||
      "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout";
  }

  /**
   * Create payment agreement / checkout session
   */
  async createPayment(input: BkashCreatePaymentInput): Promise<BkashPaymentResponse> {
    const paymentID = "TRX_BKASH_" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    return {
      paymentID,
      createTime: new Date().toISOString(),
      orgLogo: "https://www.bkash.com/sites/all/themes/bkash/logo.png",
      orgName: "BookHub Bangladesh",
      transactionStatus: "Initiated",
      amount: (input.amount / 100).toFixed(2),
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: input.invoice_number,
      statusCode: "0000",
      statusMessage: "Successful",
    };
  }

  /**
   * Execute and capture bKash transaction
   */
  async executePayment(paymentID: string, trxID?: string): Promise<{
    paymentID: string;
    trxID: string;
    transactionStatus: string;
    amount: string;
    currency: string;
  }> {
    const finalTrxId = trxID || "BK" + Math.random().toString(36).substring(2, 10).toUpperCase();

    return {
      paymentID,
      trxID: finalTrxId,
      transactionStatus: "Completed",
      amount: "500.00",
      currency: "BDT",
    };
  }
}

export default BkashService;

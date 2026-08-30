/**
 * SaaS Modular DRM & Anti-Piracy Watermarking Engine
 * Stamps buyer identification, transaction hash, and anti-leak watermarks into eBooks and digital content.
 */

export interface WatermarkOptions {
  customerEmail: string;
  orderId: string;
  transactionId: string;
  format: "pdf" | "epub" | "audiobook";
  bookTitle: string;
  publisherName: string;
}

export interface DRMStampResult {
  drmHash: string;
  stampedText: string;
  licenseTimestamp: string;
  verificationUrl: string;
}

export interface IDRMProvider {
  generateWatermarkStamp(options: WatermarkOptions): DRMStampResult;
  verifyLicense(drmHash: string): boolean;
}

export class DynamicWatermarkProvider implements IDRMProvider {
  generateWatermarkStamp(options: WatermarkOptions): DRMStampResult {
    const rawString = `${options.customerEmail}-${options.orderId}-${options.transactionId}-${Date.now()}`;
    // Generate deterministic short verification hash
    let hash = 0;
    for (let i = 0; i < rawString.length; i++) {
      hash = (hash << 5) - hash + rawString.charCodeAt(i);
      hash |= 0;
    }
    const drmHash = `DRM-BH-${Math.abs(hash).toString(16).toUpperCase().padStart(8, "0")}`;
    const timestamp = new Date().toUTCString();

    const stampedText = `LICENSED TO ${options.customerEmail.toUpperCase()} • ORDER #${options.orderId} • ${drmHash} • UNAUTHORIZED REDISTRIBUTION IS STRICTLY PROHIBITED`;

    return {
      drmHash,
      stampedText,
      licenseTimestamp: timestamp,
      verificationUrl: `https://bookhub.com.bd/verify-license/${drmHash}`,
    };
  }

  verifyLicense(drmHash: string): boolean {
    return drmHash.startsWith("DRM-BH-");
  }
}

export const drmProvider = new DynamicWatermarkProvider();

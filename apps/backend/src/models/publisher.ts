import { BaseEntity } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { generateEntityId } from "@medusajs/utils";

@Entity()
export class Publisher extends BaseEntity {
  @Column({ type: "varchar" })
  name: string;

  @Index({ unique: true })
  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar", nullable: true, select: false })
  password_hash: string;

  @Index({ unique: true })
  @Column({ type: "varchar" })
  handle: string;

  @Column({ type: "varchar" })
  store_name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", nullable: true })
  logo_url: string;

  @Column({ type: "varchar", nullable: true })
  banner_url: string;

  @Column({ type: "varchar", nullable: true })
  stripe_connect_id: string;

  @Column({ type: "boolean", default: true })
  is_verified: boolean;

  @Column({ type: "varchar", default: "active" })
  status: string;

  @Column({ type: "varchar", nullable: true })
  location: string;

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, unknown>;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "pub");
  }
}


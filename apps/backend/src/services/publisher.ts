import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import PublisherRepository from "../repositories/publisher";
import { Publisher } from "../models/publisher";
import crypto from "crypto";

type InjectedDependencies = {
  manager: EntityManager;
  publisherRepository: typeof PublisherRepository;
};

export class PublisherService extends TransactionBaseService {
  protected publisherRepository_: typeof PublisherRepository;

  constructor({ publisherRepository }: InjectedDependencies) {
    super(arguments[0]);
    this.publisherRepository_ = publisherRepository;
  }

  /**
   * List active publishers
   */
  async list(filter: Record<string, any> = {}): Promise<Publisher[]> {
    const publisherRepo = this.activeManager_.withRepository(
      this.publisherRepository_
    );

    return await publisherRepo.find({
      where: {
        status: "active",
        ...filter,
      },
      order: {
        created_at: "DESC",
      },
    });
  }

  /**
   * Retrieve a publisher by ID
   */
  async retrieve(id: string): Promise<Publisher | null> {
    const publisherRepo = this.activeManager_.withRepository(
      this.publisherRepository_
    );

    return await publisherRepo.findOne({
      where: { id },
    });
  }

  /**
   * Retrieve a publisher by URL handle
   */
  async retrieveByHandle(handle: string): Promise<Publisher | null> {
    const publisherRepo = this.activeManager_.withRepository(
      this.publisherRepository_
    );

    return await publisherRepo.findOne({
      where: { handle },
    });
  }

  /**
   * Retrieve a publisher by email (with password hash for auth)
   */
  async retrieveByEmail(email: string): Promise<Publisher | null> {
    const publisherRepo = this.activeManager_.withRepository(
      this.publisherRepository_
    );

    return await publisherRepo
      .createQueryBuilder("publisher")
      .addSelect("publisher.password_hash")
      .where("publisher.email = :email", { email: email.toLowerCase() })
      .getOne();
  }

  /**
   * Authenticate publisher credentials
   */
  async authenticate(email: string, password: string):Promise<Publisher | null> {
    const publisher = await this.retrieveByEmail(email);
    if (!publisher || !publisher.password_hash) {
      return null;
    }

    const [salt, hash] = publisher.password_hash.split(":");
    const computedHash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    if (computedHash === hash) {
      // Remove password hash from returned object
      delete (publisher as any).password_hash;
      return publisher;
    }

    return null;
  }

  /**
   * Register a new publisher
   */
  async register(data: {
    name: string;
    email: string;
    password?: string;
    store_name: string;
    handle?: string;
    description?: string;
    location?: string;
    logo_url?: string;
    banner_url?: string;
  }): Promise<Publisher> {
    return await this.atomicPhase_(async (manager: EntityManager) => {
      const publisherRepo = manager.withRepository(this.publisherRepository_);

      let password_hash = "";
      if (data.password) {
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto
          .pbkdf2Sync(data.password, salt, 1000, 64, "sha512")
          .toString("hex");
        password_hash = `${salt}:${hash}`;
      }

      const handle =
        data.handle ||
        data.store_name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      const created = publisherRepo.create({
        name: data.name,
        email: data.email.toLowerCase(),
        password_hash,
        store_name: data.store_name,
        handle,
        description: data.description,
        location: data.location || "Global",
        logo_url: data.logo_url,
        banner_url: data.banner_url,
        is_verified: true,
        status: "active",
      });

      return await publisherRepo.save(created);
    });
  }
}

export default PublisherService;


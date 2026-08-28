import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Publisher } from "../models/publisher";

const PublisherRepository = dataSource.getRepository(Publisher);

export default PublisherRepository;


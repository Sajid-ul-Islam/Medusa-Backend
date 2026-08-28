import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreatePublisher1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "publisher",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "password_hash",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "handle",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "store_name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "logo_url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "banner_url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "stripe_connect_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_verified",
            type: "boolean",
            default: true,
          },
          {
            name: "status",
            type: "varchar",
            default: "'active'",
          },
          {
            name: "location",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "metadata",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp with time zone",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createIndex(
      "publisher",
      new TableIndex({
        name: "IDX_publisher_email",
        columnNames: ["email"],
        isUnique: true,
      })
    );

    await queryRunner.createIndex(
      "publisher",
      new TableIndex({
        name: "IDX_publisher_handle",
        columnNames: ["handle"],
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("publisher", true);
  }
}


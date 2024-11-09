import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBooksTable1643054656890 implements MigrationInterface {
  name = 'CreateBooksTable1643054656890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`books\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`title\` varchar(255) NOT NULL, 
        \`author\` varchar(255) NOT NULL, 
        \`publishedDate\` date NOT NULL, 
        \`description\` text NULL, 
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`books\``);
  }
}

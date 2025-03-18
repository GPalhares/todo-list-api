const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id;

  @Column()
  name;

  @Column({ unique: true })
  email;

  @Column()
  password;

  @Column({ type: 'int' })
  user_type;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt;
}

module.exports = { User };

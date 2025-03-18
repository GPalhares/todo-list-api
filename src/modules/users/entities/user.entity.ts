const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
} = require('typeorm');
const bcrypt = require('bcrypt');

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

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}

module.exports = { User };

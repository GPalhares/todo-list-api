const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} = require('typeorm');
const { User } = require('../users/user.entity');

@Entity()
class Task {
  @PrimaryGeneratedColumn('uuid')
  id;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user;

  @Column()
  description;

  @Column({ default: 'pendente' })
  status;

  @Column('text', { array: true, default: [] })
  tags;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt;
}

module.exports = { Task };

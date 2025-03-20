import { DataSource } from 'typeorm';
import { UserEntity } from './modules/users/user.entity';

export async function seedAdminUser(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(UserEntity);

  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@demaria.com' },
  });

  if (!existingAdmin) {
    const adminUser = userRepository.create({
      name: 'Demaria-Admin',
      email: 'admin@demaria.com',
      password: 'demaria',
      userType: 2, // admin
    });

    await userRepository.save(adminUser);
  }
}

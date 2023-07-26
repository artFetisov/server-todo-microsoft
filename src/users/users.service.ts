import { CreateUserDto } from './dto/create-users.dto'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser({ email, password }: CreateUserDto) {
    return this.userRepository.create({ email, passwordHash: password })
  }

  async getAllUsers() {
    return this.userRepository.findAll({ include: { all: true } })
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }, include: { all: true } })
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({ where: { id }, include: { all: true } })
  }
}

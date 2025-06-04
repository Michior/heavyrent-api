import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    //encuentra al usuario por email o lo crea si no existe
    async findOrCreate(data: {email: string; name: string}): Promise<User> {
        let user = await this.userRepository.findOne({where: {email: data.email}});
        if (!user) {
            user = this.userRepository.create(data);
            await this.userRepository.save(user);
        }
        return user;
    }

    //buscar por Id para ptrps mpdiñps como rentals
    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOne({where: {id} } );
    }

    //opcional 
    async findAll(): Promise<User[]>{
        return this.userRepository.find();
    }

}

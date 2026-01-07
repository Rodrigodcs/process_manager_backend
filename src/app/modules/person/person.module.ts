import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './controllers/person.controller';
import { Person } from './entities/person.entity';
import { CreatePersonService } from './services/create-person.service';
import { FindAllPeopleService } from './services/find-all-people.service';
import { FindOnePersonService } from './services/find-one-person.service';
import { RemovePersonService } from './services/remove-person.service';
import { UpdatePersonService } from './services/update-person.service';

@Module({
    imports: [TypeOrmModule.forFeature([Person])],
    controllers: [PersonController],
    providers: [
        CreatePersonService,
        FindAllPeopleService,
        FindOnePersonService,
        UpdatePersonService,
        RemovePersonService,
    ],
    exports: [
        CreatePersonService,
        FindAllPeopleService,
        FindOnePersonService,
        UpdatePersonService,
        RemovePersonService,
    ],
})
export class PersonModule { }


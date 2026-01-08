import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentController } from './controllers/department.controller';
import { Department } from './entities/department.entity';
import { CreateDepartmentService } from './services/create-department.service';
import { FindAllDepartmentService } from './services/find-all-department.service';
import { FindOneDepartmentService } from './services/find-one-department.service';
import { RemoveDepartmentService } from './services/remove-department.service';
import { UpdateDepartmentService } from './services/update-department.service';

@Module({
    imports: [TypeOrmModule.forFeature([Department])],
    controllers: [DepartmentController],
    providers: [
        CreateDepartmentService,
        FindAllDepartmentService,
        FindOneDepartmentService,
        UpdateDepartmentService,
        RemoveDepartmentService,
    ],
    exports: [],
})
export class DepartmentModule { }


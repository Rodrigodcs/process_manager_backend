import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../department/entities/department.entity';
import { Document } from '../document/entities/document.entity';
import { Person } from '../person/entities/person.entity';
import { Process } from '../process/entities/process.entity';
import { Tool } from '../tool/entities/tool.entity';
import { User } from '../user/entities/user.entity';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Department,
            Process,
            Person,
            Tool,
            Document,
        ]),
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule { }


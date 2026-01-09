import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, IsNull, Repository, MoreThanOrEqual } from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { Document } from '../../document/entities/document.entity';
import { Person } from '../../person/entities/person.entity';
import { Process } from '../../process/entities/process.entity';
import { Tool } from '../../tool/entities/tool.entity';
import { User } from '../../user/entities/user.entity';

export interface DashboardStats {
    overview: {
        totalUsers: number;
        totalDepartments: number;
        totalProcesses: number;
        totalSubprocesses: number;
        totalPeople: number;
        totalTools: number;
        totalDocuments: number;
    };
    processesByDepartment: {
        departmentId: string;
        departmentName: string;
        departmentColor: string;
        processCount: number;
    }[];
    topDepartments: {
        departmentId: string;
        departmentName: string;
        departmentColor: string;
        processCount: number;
    }[];
    recentActivity: {
        processesCreatedLast7Days: number;
        processesCreatedLast30Days: number;
        departmentsCreatedLast30Days: number;
    };
    processHierarchy: {
        mainProcesses: number;
        subprocesses: number;
        averageSubprocessesPerProcess: number;
    };
}

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        @InjectRepository(Tool)
        private readonly toolRepository: Repository<Tool>,
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
    ) { }

    async getStats(): Promise<DashboardStats> {
        // Overview - Totais
        const [
            totalUsers,
            totalDepartments,
            totalProcesses,
            totalSubprocesses,
            totalPeople,
            totalTools,
            totalDocuments,
        ] = await Promise.all([
            this.userRepository.count(),
            this.departmentRepository.count(),
            this.processRepository.count(),
            this.processRepository.count({ where: { parentId: Not(IsNull()) } }),
            this.personRepository.count(),
            this.toolRepository.count(),
            this.documentRepository.count(),
        ]);

        // Processos por departamento
        const processesByDepartmentRaw = await this.processRepository
            .createQueryBuilder('process')
            .leftJoin('process.department', 'department')
            .select('department.id', 'departmentId')
            .addSelect('department.name', 'departmentName')
            .addSelect('department.color', 'departmentColor')
            .addSelect('COUNT(process.id)', 'processCount')
            .groupBy('department.id')
            .addGroupBy('department.name')
            .addGroupBy('department.color')
            .getRawMany();

        const processesByDepartment = processesByDepartmentRaw.map((item) => ({
            departmentId: item.departmentId,
            departmentName: item.departmentName,
            departmentColor: item.departmentColor,
            processCount: parseInt(item.processCount, 10),
        }));

        // Top 5 departamentos com mais processos
        const topDepartments = [...processesByDepartment]
            .sort((a, b) => b.processCount - a.processCount)
            .slice(0, 5);

        // Atividade recente
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const [
            processesCreatedLast7Days,
            processesCreatedLast30Days,
            departmentsCreatedLast30Days,
        ] = await Promise.all([
            this.processRepository.count({
                where: {
                    createdAt: MoreThanOrEqual(sevenDaysAgo),
                },
            }),
            this.processRepository.count({
                where: {
                    createdAt: MoreThanOrEqual(thirtyDaysAgo),
                },
            }),
            this.departmentRepository.count({
                where: {
                    createdAt: MoreThanOrEqual(thirtyDaysAgo),
                },
            }),
        ]);

        // Hierarquia de processos
        const mainProcesses = totalProcesses - totalSubprocesses;
        const averageSubprocessesPerProcess =
            mainProcesses > 0 ? totalSubprocesses / mainProcesses : 0;

        return {
            overview: {
                totalUsers,
                totalDepartments,
                totalProcesses,
                totalSubprocesses,
                totalPeople,
                totalTools,
                totalDocuments,
            },
            processesByDepartment,
            topDepartments,
            recentActivity: {
                processesCreatedLast7Days,
                processesCreatedLast30Days,
                departmentsCreatedLast30Days,
            },
            processHierarchy: {
                mainProcesses,
                subprocesses: totalSubprocesses,
                averageSubprocessesPerProcess: parseFloat(
                    averageSubprocessesPerProcess.toFixed(2),
                ),
            },
        };
    }
}


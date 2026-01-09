import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { ProcessDocument } from './process-document';
import { ProcessPerson } from './process-person';
import { ProcessTool } from './process-tool';

export enum ProcessType {
  MANUAL = 'MANUAL',
  SYSTEMIC = 'SYSTEMIC',
}

export enum ProcessStatus {
  ACTIVE = 'ACTIVE',
  IN_REVIEW = 'IN_REVIEW',
  DEPRECATED = 'DEPRECATED',
}

@Entity('processes')
export class Process {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: ProcessType })
  type: ProcessType;

  @Column({ type: 'enum', enum: ProcessStatus })
  status: ProcessStatus;

  @Column({ type: 'integer', default: 0 })
  order: number;

  @Column({ name: 'department_id', type: 'uuid' })
  departmentId: string;

  @ManyToOne(() => Department, (department) => department.processes)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  parentId?: string;

  @ManyToOne(() => Process, (process) => process.children)
  @JoinColumn({ name: 'parent_id' })
  parent?: Process;

  @OneToMany(() => Process, (process) => process.parent)
  children: Process[];

  @OneToMany(() => ProcessTool, (pt) => pt.process)
  tools: ProcessTool[];

  @OneToMany(() => ProcessPerson, (pp) => pp.process)
  people: ProcessPerson[];

  @OneToMany(() => ProcessDocument, (pd) => pd.process)
  documents: ProcessDocument[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;
}

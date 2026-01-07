import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Process } from './process.entity';

@Entity('process_people')
export class ProcessPerson {
  @PrimaryColumn({ name: 'process_id', type: 'uuid' })
  processId: string;

  @PrimaryColumn({ name: 'person_id', type: 'uuid' })
  personId: string;

  @ManyToOne(() => Process, (process) => process.people)
  @JoinColumn({ name: 'process_id' })
  process: Process;

  @ManyToOne(() => Person, (person) => person.processes)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}

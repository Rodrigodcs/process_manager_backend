import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Tool } from '../../tool/entities/tool.entity';
import { Process } from './process.entity';

@Entity('process_tools')
export class ProcessTool {
  @PrimaryColumn({ name: 'process_id', type: 'uuid' })
  processId: string;

  @PrimaryColumn({ name: 'tool_id', type: 'uuid' })
  toolId: string;

  @ManyToOne(() => Process, (process) => process.tools)
  @JoinColumn({ name: 'process_id' })
  process: Process;

  @ManyToOne(() => Tool, (tool) => tool.processes)
  @JoinColumn({ name: 'tool_id' })
  tool: Tool;
}

import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardService, DashboardStats } from '../services/dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('stats')
    @ApiOperation({ summary: 'Get dashboard statistics' })
    @ApiResponse({
        status: 200,
        description: 'Dashboard statistics retrieved successfully',
    })
    async getStats(): Promise<DashboardStats> {
        return this.dashboardService.getStats();
    }
}


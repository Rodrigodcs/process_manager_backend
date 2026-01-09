import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from './app/middlewares/auth.middleware';
import { AuthModule } from './app/modules/auth/auth.module';
import { DashboardModule } from './app/modules/dashboard/dashboard.module';
import { DepartmentModule } from './app/modules/department/department.module';
import { DocumentModule } from './app/modules/document/document.module';
import { HealthModule } from './app/modules/health/health.module';
import { PersonModule } from './app/modules/person/person.module';
import { ProcessModule } from './app/modules/process/process.module';
import { ToolModule } from './app/modules/tool/tool.module';
import { UserModule } from './app/modules/user/user.module';
import { TypeormModule } from './infra/typeorm/typeorm.module';

@Module({
  imports: [
    TypeormModule,
    DepartmentModule,
    ProcessModule,
    ToolModule,
    PersonModule,
    DocumentModule,
    AuthModule,
    UserModule,
    HealthModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      AuthMiddleware,
    ).exclude(
      'health',
      'auth/sign-up',
      'auth/sign-in',
    ).forRoutes('*');
  }
}

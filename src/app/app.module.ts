import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { UserMiddlware } from 'src/users/user.middleware';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserMiddlware).forRoutes({ path: 'users', method: RequestMethod.POST });
    }
}

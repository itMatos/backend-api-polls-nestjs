import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { UserMiddlware } from 'src/users/user.middleware';
import { PollsModule } from 'src/polls/polls.module';
import { AnswersModule } from 'src/answers/answers.module';
import { UuidModule } from 'nestjs-uuid';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        UserModule,
        PollsModule,
        AnswersModule,
        UuidModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserMiddlware).forRoutes({ path: 'users', method: RequestMethod.POST });
    }
}

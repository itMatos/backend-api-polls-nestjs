import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { Votes } from './entities/vote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Votes])],
    controllers: [VotesController],
    providers: [VotesService],
})
export class VotesModule {}

import { Module } from '@nestjs/common';
import { PassesService } from './passes.service';
import { PassesController } from './passes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pass } from './entities/pass.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pass]),
  ],
  controllers: [PassesController],
  providers: [PassesService],
})
export class PassesModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { PassesModule } from './passes/passes.module';
import { Pass } from './passes/entities/pass.entity';
import { LocationModule } from './location/location.module';
import { Country } from './location/entities/country.entity';
import { City } from './location/entities/city.entity';
import { PostalCode } from './location/entities/postalcode.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      logging: true,
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Pass, Country, City, PostalCode],
      synchronize: false,
    }),
    UserModule,
    PassesModule,
    LocationModule
  ],
})
export class AppModule {}

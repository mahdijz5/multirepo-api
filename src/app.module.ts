import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import { SharedModule } from '@mahdijz5/my-first-package';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal : true,
    envFilePath : './env'
  }),SharedModule.registerRmq("AUTH_SERVICE","auth_queue")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

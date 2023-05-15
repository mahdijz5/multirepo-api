import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {  ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard, ExceptionDeserializer,HttpExceptionFilter } from '@mahdijz5/my-first-package';
import { Response } from 'express';

UseFilters(HttpExceptionFilter);
@Controller()
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy) { }

  @Get('user/:id')
  async getUsers(@Param("id") id: number) {
    try {
      return await firstValueFrom(this.authService.send('get-user', { id }))
    } catch (error) {

      throw new ExceptionDeserializer(error)
    }
  }

  @Get('post')
  async getPost(@Param("id") id: number) {
    try {
      return await firstValueFrom(this.authService.send('get-post', { id }))
    } catch (error) {

      throw  new ExceptionDeserializer(error)
    }
  }

  @Post('post')
  async CreatePost(@Param("id") id: number) {
    try {
      return await firstValueFrom(this.authService.send('create-post', { id }))
    } catch (error) {

      throw  new ExceptionDeserializer(error)
    }
  }


  @Post('auth/register')
  async register(@Body() data) {
    try {
      return await firstValueFrom(this.authService.send('register-user', data))
    } catch (error) {
      throw  new ExceptionDeserializer(error)
    }
  }

  @Post('auth/login')
  async login(@Body() data) {
    try {
      return await firstValueFrom(this.authService.send('login-user', data))
    } catch (error) {
      throw  new ExceptionDeserializer(error)
    }
  }

  @UseGuards(AuthGuard)
  @Post("auth")
  async authorization(@Res() res : Response) {
    res.status(200).json({"message " : "Your authorized"})
  }

}

import { Controller, Get, Head, Header, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req:Request): string {
    console.log(req.headers["session"])
    return this.appService.getHello();
  }
}

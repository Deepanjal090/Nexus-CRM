import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      status: 'success',
      message: 'NEXUS API is live',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}

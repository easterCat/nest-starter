import { Controller, Post, Get, Render } from '@nestjs/common';

@Controller('')
export class UserController {
  @Get('login')
  @Render('login.hbs')
  public login(): string {
    return '';
  }

  @Get('register')
  @Render('register.hbs')
  public register(): string {
    return '';
  }
}

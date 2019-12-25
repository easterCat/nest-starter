import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  public renderLoginPage(): string {
    return `<div style="color:blue">
        <form action="/user/login" method="post">
            <div>
                <label for="name">Name:</label>
                <input name="name" type="text" id="name">
            </div>
            <div>
                <label for="mail">E-mail:</label>
                <input name="email" type="email" id="mail">
            </div>
            <div>
                <label for="msg">description:</label>
                <textarea name="description" id="description"></textarea>
            </div>
            <button type="submit">Send your message</button>
        </form>
    </div>`;
  }

  @Post('login')
  public login(
    @Body() loginInfo: { name: string; email: string; description: string },
  ): string {
    return `<div>${loginInfo.name} + ${loginInfo.email} + ${loginInfo.description}</div>`;
  }
}

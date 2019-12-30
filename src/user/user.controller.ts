import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Render,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

interface IResult {
  code: number;
  message: string;
  data?: any;
}

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  @Render('login.hbs')
  public renderLogin(): string {
    return '';
  }

  @Get('register')
  @Render('register.hbs')
  public async renderRegister() {
    return '';
  }

  /**
   * 用户注册
   * @param user
   */
  @ApiTags('用户注册')
  @Post('api/user/register')
  public async register(
    @Body()
    user: {
      account: string;
      password: string;
    },
  ): Promise<IResult> {
    const result = await this.userService.register(user);
    return { code: 200, message: '注册成功', data: result };
  }

  @ApiTags('删除用户')
  @Delete('api/user/:id')
  async remove(@Param() id: number): Promise<IResult> {
    const data = await this.userService.remove(id);
    return { code: 200, message: '删除用户成功', data };
  }

  @ApiTags('更新用户')
  @Put('api/user/:id')
  async update(@Param() id: number, updateInput: User): Promise<IResult> {
    const data = await this.userService.update(id, updateInput);
    return { code: 200, message: '更新用户成功', data };
  }

  @ApiTags('查找用户')
  @Get('api/user/:id')
  async findOne(@Param() id: number): Promise<IResult> {
    const data = await this.userService.findOneWithPostsById(id);
    return { code: 200, message: '查询用户成功', data };
  }

  @ApiTags('查找全部用户')
  @Get('api/user/')
  async findAll(): Promise<IResult> {
    const data = await this.userService.findAll();
    return { code: 200, message: '查询所有用户成功', data };
  }
}

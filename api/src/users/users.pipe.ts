import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async transform(ids: any) {
    if (ids === undefined) {
      return undefined;
    }
    const idList = ids.split(',') || [];
    // NOTE: After we add cache, we will use it right here, because this is a little too much
    const users = (await this.usersService.findUsersWithIds(idList)).map(
      (x) => x.id,
    );
    const nonOverlapping = idList.filter((x) => !users.includes(x));
    if (nonOverlapping.length > 0) {
      throw new BadRequestException(
        `Users: ${nonOverlapping.join(', ')} do not exist`,
      );
    }
    return users;
  }
}

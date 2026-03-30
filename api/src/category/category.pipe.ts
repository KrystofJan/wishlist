import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CategoryService } from './category.service';

@Injectable()
export class CategoryExistsPipe implements PipeTransform {
  constructor(private readonly categoryService: CategoryService) {}
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async transform(ids: any) {
    if (ids === undefined) {
      return undefined;
    }
    // Handle both "1,2,3" and ["1", "2", "3"] (repeated params)
    const idList = (Array.isArray(ids) ? ids : ids.split(',')).map(Number);
    const categories = (await this.categoryService.findByIds(idList)).map(
      (x) => x.id,
    );
    const nonOverlapping = idList.filter((x) => !categories.includes(x));
    if (nonOverlapping.length > 0) {
      throw new BadRequestException(
        `Categories [${nonOverlapping.join(', ')}] do not exist`,
      );
    }
    return categories;
  }
}

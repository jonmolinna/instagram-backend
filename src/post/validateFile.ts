import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('AQUIIII PIPE');
    const fourMB = 1000 * 1000;
    console.log('TAMAÑO', value.size);
    return value.size < fourMB;
  }
}

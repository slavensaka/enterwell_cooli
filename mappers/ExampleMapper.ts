import { ExampleModel } from '@/models/ExampleModel';

/**
 * Maps raw API data to ExampleModel instances.
 */
export class ExampleMapper {
  static toModel(data: any): ExampleModel {
    return new ExampleModel(
      data.id,
      data.title,
      data.description
    );
  }

  static toModelArray(data: any[]): ExampleModel[] {
    return data.map(item => this.toModel(item));
  }
}

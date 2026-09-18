import { DynamicModule, Module } from '@nestjs/common';
import {
  MongooseModule,
  MongooseModuleAsyncOptions,
  MongooseModuleOptions
} from '@nestjs/mongoose';

@Module({})
export class DatabaseModule {
  static forRoot(uri: string, options?: MongooseModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [MongooseModule.forRoot(uri, options)],
      exports: [MongooseModule]
    };
  }

  static forRootAsync(options: MongooseModuleAsyncOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [MongooseModule.forRootAsync(options)],
      exports: [MongooseModule]
    };
  }
}

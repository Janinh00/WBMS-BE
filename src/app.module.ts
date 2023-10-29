import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DbModule } from './db/db.module';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { CompanyModule } from './company/company.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerGroupModule } from './customer-group/customerGroups.module';
import { CustomerTypeModule } from './customer-type/customer-type.module';
import { BarcodeTypeModule } from './barcode-type/barcode-type.module';
import { SiteModule } from './site/site.module';
// === sampai sini

import { TransactionModule } from './transaction/transactions.module';

import { MillsModule } from './mill/mills.module';
import { WeighbridgesModule } from './weighbridge/weighbridges.module';
import { ConfigsModule } from './config/configs.module';

import { ProductsModule } from './product/products.module';
import { StorageTanksModule } from './storage-tank/storageTanks.module';
import { ProductGroupsModule } from './product-group/productGroups.module';

import { SemaiModule } from './semai/semai.module';
import { DriverModule } from './driver/driver.module';
import { TransportVehicleModule } from './transport-vehicle/transport-vehicle.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    AuthModule,
    TransactionModule,
    SiteModule,
    CompanyModule,
    CityModule,
    CustomerTypeModule,
    CustomerGroupModule,
    BarcodeTypeModule,
    CustomerModule,
    MillsModule,
    WeighbridgesModule,
    ConfigsModule,
    UserModule,
    ProductsModule,
    StorageTanksModule,
    ProductGroupsModule,
    ProvinceModule,
    SemaiModule,
    DriverModule,
    TransportVehicleModule,
    RoleModule
  ]
})
export class AppModule {}

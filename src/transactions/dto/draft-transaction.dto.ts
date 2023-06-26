import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { QrcodeDto } from 'src/semai/dto/qrcode.dt';

export class DraftTransactionDto {
  tType = 1;

  bonTripNo?: string;
  vehicleStatus: number;
  deliveryStatus: number;
  progressStatus: number;

  deliveryOrderId?: string;
  deliveryOrderNo?: string;
  deliveryDate?: Date;

  productId?: string;
  productCode?: string;
  productName?: string;

  transporterId?: string;
  transporterCompanyCode?: string;
  transporterCompanyName?: string;
  transporterCompanyShortName?: string;

  driverId?: string;
  driverNik?: string;
  driverName?: string;
  driverLicenseNo?: string;

  transportVehicleId?: string;
  transportVehiclePlateNo?: string;
  transportVehicleProductCode?: string;
  transportVehicleProductName?: string;
  transportVehicleSccModel?: number;

  // originSiteId   String? @db.Char(36)
  // originSiteCode String? @db.VarChar(20)
  // originSiteName String? @db.VarChar(20)

  // destinationSiteId   String? @db.Char(36)
  // destinationSiteCode String? @db.VarChar(20)
  // destinationSiteName String? @db.VarChar(20)

  // originSourceStorageTankId   String? @db.Char(36)
  // originSourceStorageTankCode String? @db.VarChar(20)
  // originSourceStorageTankName String? @db.VarChar(20)

  // destinationSinkStorageTankId   String? @db.Char(36)
  // destinationSinkStorageTankCode String? @db.VarChar(20)
  // destinationSinkStorageTankName String? @db.VarChar(20)

  // deliveryOrderId String?   @db.VarChar(50)
  // deliveryOrderNo String?   @db.VarChar(50)
  // deliveryDate    DateTime?

  // rspoSccModel     Int?
  // rspoUniqueNumber String? @db.VarChar(50)
  // isccSccModel     Int?
  // isccUniqueNumber String? @db.VarChar(50)
  // isccGhgValue     Float?
  // isccEeeValue     Float?

  // originFfaPercentage   Float?
  // originMoistPercentage Float?
  // originDirtPercentage  Float?

  originWeighInKg: number;
  originWeighInRemark?: string;
  originWeighInOperatorName?: string;
  originWeighInTimestamp?: Date;

  originWeighOutKg: number;
  originWeighOutRemark?: string;
  originWeighOutOperatorName?: string;
  originWeighOutTimestamp?: Date;

  potonganWajib: number;
  potonganLain: number;

  // destinationWeighInKg           Float     @default(0)
  // destinationWeighInRemark       String?   @db.VarChar(500)
  // destinationWeighInOperatorName String?   @db.VarChar(50)
  // destinationWeighInTimestamp    DateTime?

  // destinationWeighOutKg           Float     @default(0)
  // destinationWeighOutRemark       String?   @db.VarChar(500)
  // destinationWeighOutOperatorName String?   @db.VarChar(50)
  // destinationWeighOutTimestamp    DateTime?

  returnWeighInKg: number;
  returnWeighInRemark?: string;
  returnWeighInOperatorName?: string;
  returnWeighInTimestamp?: Date;

  returnWeighOutKg: number;
  returnWeighOutRemark?: string;
  returnWeighOutOperatorName?: string;
  returnWeighOutTimestamp?: Date;

  currentSeal1?: string;
  currentSeal2?: string;
  currentSeal3?: string;
  currentSeal4?: string;

  // loadedSeal1         String?
  // loadedSeal2         String?
  // loadedSeal3         String?
  // loadedSeal4         String?
  // loadingRemark       String?
  // loadingOperatorName String?
  // loadingTimestamp    DateTime?

  // unloadedSeal1         String?
  // unloadedSeal2         String?
  // unloadedSeal3         String?
  // unloadedSeal4         String?
  // unloadingRemark       String?
  // unloadingOperatorName String?
  // unloadingTimestamp    DateTime?

  // returnUnloadedSeal1         String?
  // returnUnloadedSeal2         String?
  // returnUnloadedSeal3         String?
  // returnUnloadedSeal4         String?
  // returnUnloadingRemark       String?
  // returnUnloadingOperatorName String?
  // returnUnloadingTimestamp    DateTime?

  jsonData: QrcodeDto;
}

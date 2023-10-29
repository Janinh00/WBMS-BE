import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { QrcodeDto } from 'src/semai/dto/qrcode.dto';

export class DraftTransactionDto {
  typeSite = 1;
  typeTransaction = 1;

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

  rspoCertificateNumber?: string;
  rspoSccModel: number;
  rspoUniqueNumber?: string;

  isccCertificateNumber?: string;
  isccSccModel: number;
  isccUniqueNumber?: string;
  isccGhgValue: number;
  isccEeeValue: number;

  ispoCertificateNumber?: string;
  ispoSccModel: number;
  ispoUniqueNumber?: string;

  transporterCompanyId?: string;
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

  originSiteId?: string;
  originSiteCode?: string;
  originSiteName?: string;

  originSourceStorageTankId?: string;
  originSourceStorageTankCode?: string;
  originSourceStorageTankName?: string;

  destinationSiteId?: string;
  destinationSiteCode?: string;
  destinationSiteName?: string;

  destinationSinkStorageTankId?: string;
  destinationSinkStorageTankCode?: string;
  destinationSinkStorageTankName?: string;

  originFfaPercentage: number;
  originMoistPercentage: number;
  originDirtPercentage: number;

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

  destinationWeighInKg: number;
  destinationWeighInRemark?: string;
  destinationWeighInOperatorName?: string;
  destinationWeighInTimestamp?: Date;

  destinationWeighOutKg: number;
  destinationWeighOutRemark?: string;
  destinationWeighOutOperatorName?: string;
  destinationWeighOutTimestamp?: Date;

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

  loadedSeal1?: string;
  loadedSeal2?: string;
  loadedSeal3?: string;
  loadedSeal4?: string;
  loadingRemark?: string;
  loadingOperatorName?: string;
  loadingTimestamp?: Date;

  unloadedSeal1?: string;
  unloadedSeal2?: string;
  unloadedSeal3?: string;
  unloadedSeal4?: string;
  unloadingRemark?: string;
  unloadingOperatorName?: string;
  unloadingTimestamp?: Date;

  returnUnloadedSeal1?: string;
  returnUnloadedSeal2?: string;
  returnUnloadedSeal3?: string;
  returnUnloadedSeal4?: string;
  returnUnloadingRemark?: string;
  returnUnloadingOperatorName?: string;
  returnUnloadingTimestamp?: Date;

  jsonData?: QrcodeDto;
}

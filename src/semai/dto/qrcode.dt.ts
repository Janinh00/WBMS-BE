import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsDecimal,
  IsInt,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class QrcodeDto {
  formatIdentifier?: string;
  formatVersion?: number;
  functionCode?: number;
  applicationId?: number;
  applicationVersion?: string;
  deviceId?: string;

  transporterCompanyCode?: string;
  transporterCompanyShortName?: string;
  transporterCompanyFullName?: string;

  driverCitizenNo?: string;
  driverFullName?: string;

  vehiclePlateNo?: string;
  vehicleProductCode?: string;
  vehicleProductName?: string;
  vehicleAllowableSccModel?: number;

  drivingLicenceNo?: string;
  vehicleOperationStatus?: number;

  currentSeal1?: string;
  currentSeal2?: string;
  currentSeal3?: string;
  currentSeal4?: string;

  deliveryOrderId?: string;
  deliveryOrderNo?: string;
  deliveryDate?: string;

  productCode?: string;
  productName?: string;

  originSiteCode?: string;
  originSiteName?: string;
  originSourceTankCode?: string;
  originSourceTankName?: string;

  destinationSiteCode?: string;
  destinationSiteName?: string;
  destinationSinkTankCode?: string;
  destinationSinkTankName?: string;

  rspoSccModel?: number;
  rspoUniqueNumber?: string;
  isccSccModel?: number;
  isccUniqueNumber?: string;
  isccGhgValue?: number;
  isccEeeValue?: number;

  deliveryStatus?: number;

  originFfaPercentage?: number;
  originMoistPercentage?: number;
  originDirtPercentage?: number;

  originWeighInTimestamp?: string;
  originWeighInOperatorName?: string;
  originWeighInKg?: number;
  originWeighInRemark?: string;

  originWeighOutTimestamp?: string;
  originWeighOutOperatorName?: string;
  originWeighOutKg?: number;
  originWeighOutRemark?: string;

  originNettoKg?: number;

  destinationWeighInTimestamp?: string;
  destinationWeighInOperatorName?: string;
  destinationWeighInKg?: number;
  destinationWeighInRemark?: string;

  destinationWeighOutTimestamp?: string;
  destinationWeighOutOperatorName?: string;
  destinationWeighOutKg?: number;
  destinationWeighOutRemark?: string;

  destinationNettoKg?: number;

  returnWeighInTimestamp?: string;
  returnWeighInOperatorName?: string;
  returnWeighInKg: number;
  returnWeighInRemark?: string;

  returnWeighOutTimestamp?: string;
  returnWeighOutOperatorName?: string;
  returnWeighOutKg: number;
  returnWeighOutRemark?: string;

  returnNettoKg?: number;

  loadingTimestamp?: string;
  loadingOperatorName?: string;
  loadedSeal1?: string;
  loadedSeal2?: string;
  loadedSeal3?: string;
  loadedSeal4?: string;
  loadingRemark?: string;

  unloadingTimestamp?: string;
  unloadingOperatorName?: string;
  unloadedSeal1?: string;
  unloadedSeal2?: string;
  unloadedSeal3?: string;
  unloadedSeal4?: string;
  unloadingRemark?: string;

  returnUnloadingTimestamp?: string;
  returnUnloadingOperatorName?: string;
  returnUnloadedSeal1?: string;
  returnUnloadedSeal2?: string;
  returnUnloadedSeal3?: string;
  returnUnloadedSeal4?: string;
  returnUnloadingRemark?: string;

  externalRefNo?: string;
  externalRefNo2?: string;
  signature?: string;
}

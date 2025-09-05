import { getPhoneInfoRestGO } from './get_phone_Info_rest_sdk_example.js';
import {getPhoneInfoSoapGO} from './get_phone_Info_soap_sdk_example.js';

async function main() {
  //Your license key from Service Objects.
  //Trial license keys will only work on the
  //trail environments and production license
  //keys will only work on production environments.
  const licenseKey = "LICENSE KEY";
  const isLive = false;

// GeoPhone Plus 2 - GetPhoneInfoInput - REST SDK
await  getPhoneInfoRestGO(licenseKey, isLive);

// GeoPhone Plus 2 - GetPhoneInfoInput - SOAP SDK
await  getPhoneInfoSoapGO(licenseKey, isLive);
  
}
main().catch((err) => console.error("Error:", err));
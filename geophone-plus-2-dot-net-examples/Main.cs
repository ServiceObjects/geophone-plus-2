using geophone_plus_2_dot_net_examples;

//Your license key from Service Objects.
//Trial license keys will only work on the
//trail environments and production license
//keys will only work on production environments.
string LicenseKey = "LICENSE KEY";

bool IsProductionKey = false;

// GeoPhone Plus 2 - GetPhoneInfoInput - REST SDK
 GetPhoneInfoRestSdkExample.Go(LicenseKey, IsProductionKey);

// GeoPhone Plus 2 - GetPhoneInfoInput - SOAP SDK
 GetPhoneInfoSoapSdkExample.Go(LicenseKey, IsProductionKey);
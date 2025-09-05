from get_phone_Info_rest_sdk_example import get_phone_info_rest_sdk_go
from get_phone_Info_soap_sdk_example import get_phone_info_soap_sdk_go

if __name__ == "__main__":  
  # Your license key from Service Objects.  
  # Trial license keys will only work on the trial environments and production  
  # license keys will only work on production environments.  
  license_key = "LICENSE KEY"  
  is_live = False

  # GeoPhone Plus 2 - GetPhoneInfoInput - REST SDK
  get_phone_info_rest_sdk_go(is_live,license_key)

  #GeoPhone Plus 2 - GetPhoneInfoInput - SOAP SDK
  get_phone_info_soap_sdk_go(is_live,license_key)
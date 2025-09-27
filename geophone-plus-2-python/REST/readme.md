![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# GPPL2 - GeoPhone Plus 2 

DOTS GeoPhone Plus 2 (referred to as “GeoPhone Plus 2” or “GPPL 2”) is a publicly available XML web service that provides reverse phone lookup information about a US (or sometimes Canadian) phone number. The service provides name, address, city, state and lat/long, along with carrier exchange information.

This service provides Landline, Wireless and Toll free contact data are all available with one call to the service. GeoPhone Plus 2 can provide instant reverse-phone lookup verification to websites or data enhancement to contact lists. However, the output from GP must be considered carefully before the existence or non-existence of a given phone number is decided.

## [Service Objects Website](https://serviceobjects.com)

# GPPL2 - GetPhoneInfo

This is the basic operation for finding the reverse-lookup information. Given a phone number and test type, it will consult national directory-assistance databases to find the owner and address registered. The addresses returned are validated via third party address-validation technique. They are returned to you exactly as the phone carrier releases them. If you need these addresses to be validated, using Service Objects’ AddressValidation web services is highly recommended. 

Both the contact’s information and the phone company’s information are returned with this operation.In addition to the full functionality of the original service.

Two valuable bits of information are also retrieved – whether the phone line is for business or residential purposes, and whether the phone line is landline or wireless. By examining the WSDL, you may see that multiple groups of contact/exchange information are possible. Although they are possible in the XML, you will only see one exchange per output, always. It is common, however, to see multiple contacts per phone number (as people change numbers, or there may be multiple businesses at the same phone number.) 

It is highly recommended that you handle each of these contacts, rather than just the first contact returned.

### [GetPhoneInfo Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-geophone-plus-2/dots-geophone-plus-2/gppl2-getphoneinfo-recommended-operation/)

## Library Usage

```
# 1. Build the input
#
#  Required fields:
#               phone_number
#               test_type 
#               license_key
#               is_live
# 
# Optional:
#       timeout_seconds

from get_phone_Info_rest import get_phone_info

phone_number = "8059631700"
test_type = "FULL"
timeout_seconds = 15
is_live = True
license_key = "YOUR LICENSE KEY"

# 2. Call the method.
response = get_phone_info(phone_number, test_type, license_key, is_live, timeout_seconds)

# 3. Inspect results.
if response.Error is None:
    print("\n* Phone Info *\n")
    if response.PhoneInfo:
        print(f"SMS Address      : {response.PhoneInfo.SMSAddress}")
        print(f"MMS Address      : {response.PhoneInfo.MMSAddress}")
        print(f"Date First Seen  : {response.PhoneInfo.DateFirstSeen}")
        print(f"Date of Porting  : {response.PhoneInfo.DateOfPorting}")
        print(f"Note Codes       : {response.PhoneInfo.NoteCodes}")
        print(f"Note Descriptions: {response.PhoneInfo.NoteDescriptions}")
        print(f"Tokens Used      : {response.PhoneInfo.TokensUsed}")

        print("\n* Provider Details *\n")
        if response.PhoneInfo.Provider:
            print(f"Name     : {response.PhoneInfo.Provider.Name}")
            print(f"City     : {response.PhoneInfo.Provider.City}")
            print(f"State    : {response.PhoneInfo.Provider.State}")
            print(f"Line Type: {response.PhoneInfo.Provider.LineType}")
            print(f"Latitude : {response.PhoneInfo.Provider.Latitude}")
            print(f"Longitude: {response.PhoneInfo.Provider.Longitude}")
        else:
            print("No provider details found.")

        print("\n* Contacts *\n")
        if hasattr(response.PhoneInfo, 'Contacts') and response.PhoneInfo.Contacts:
            for contact in response.PhoneInfo.Contacts:
                print(f"Name           : {contact.Name}")
                print(f"Address        : {contact.Address}")
                print(f"City           : {contact.City}")
                print(f"State          : {contact.State}")
                print(f"Postal Code    : {contact.PostalCode}")
                print(f"Phone Type     : {contact.PhoneType}")
                print(f"Latitude       : {contact.Latitude}")
                print(f"Longitude      : {contact.Longitude}")
                print(f"SIC Code       : {contact.SICCode}")
                print(f"SIC Description: {contact.SICDesc}")
                print(f"Quality Score  : {contact.QualityScore}")
                print("")
        else:
            print("No contacts found.")
    else:
        print("No phone info found.")
else:
    print("\n* Error *\n")
    print(f"Error Type       : {response.Error.Type}")
    print(f"Error Type Code  : {response.Error.TypeCode}")
    print(f"Error Description: {response.Error.Desc}")
    print(f"Error Desc Code  : {response.Error.DescCode}")
```


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
// 1. Build the input
//
//  Required fields:
//               PhoneNumber
//               TestType 
//               LicenseKey
//               IsLive
// 
// Optional:
//       TimeoutSeconds (default: 15)

const phone_number = "8059631700";
const test_type = "FULL";
const timeoutSeconds = 15;

import {GetPhoneInfoSoap} from '../geophone-plus-2-nodejs/src/SOAP/get_phone_Info_soap.js';

// 2. Call the sync Invoke() method.
 const gppl2=new GetPhoneInfoSoap(phone_number, phone_number, licenseKey, isLive);
 const response = await gppl2.getPhoneInfo();

// 3. Inspect results.
if (response.PhoneInfo) 
{
        console.log(`SMS Address      : ${response.PhoneInfo.SMSAddress}`);
        console.log(`MMS Address      : ${response.PhoneInfo.MMSAddress}`);
        console.log(`Date First Seen  : ${response.PhoneInfo.DateFirstSeen}`);
        console.log(`Date of Porting  : ${response.PhoneInfo.DateOfPorting}`);
        console.log(`Note Codes       : ${response.PhoneInfo.NoteCodes}`);
        console.log(`Note Descriptions: ${response.PhoneInfo.NoteDescriptions}`);
        console.log(`Tokens Used      : ${response.PhoneInfo.TokensUsed}`);
 
        console.log("\n* Provider Details *\n");

    if (response.PhoneInfo.Provider)
    {
        console.log(`Name     : ${response.PhoneInfo.Provider.Name}`);
        console.log(`City     : ${response.PhoneInfo.Provider.City}`);
        console.log(`State    : ${response.PhoneInfo.Provider.State}`);
        console.log(`Line Type: ${response.PhoneInfo.Provider.LineType}`);
        console.log(`Latitude : ${response.PhoneInfo.Provider.Latitude}`);
        console.log(`Longitude: ${response.PhoneInfo.Provider.Longitude}`);
    }
    else
    {
      console.log("No provider details found.");
    }

    console.log("\n* Contacts *\n");
    if (response.PhoneInfo.Contacts && response.PhoneInfo.Contacts.length > 0)
    {
        response.PhoneInfo.Contacts.forEach((contact, index) => {
        console.log(`Name           : ${contact.Name}`);
        console.log(`Address        : ${contact.Address}`);
        console.log(`City           : ${contact.City}`);
        console.log(`State          : ${contact.State}`);
        console.log(`Postal Code    : ${contact.PostalCode}`);
        console.log(`Phone Type     : ${contact.PhoneType}`);
        console.log(`Latitude       : ${contact.Latitude}`);
        console.log(`Longitude      : ${contact.Longitude}`);
        console.log(`SIC Code       : ${contact.SICCode}`);
        console.log(`SIC Description: ${contact.SICDesc}`);
        console.log(`Quality Score  : ${contact.QualityScore}`);
        console.log("\n");
    });
    }
    else
    {
       console.log("No contacts found.");
    }
} 
else 
{
    console.log("\n* Phone Info *\n");
    console.log("No phone info found.");
}
if (response.Error) 
{
    console.log("\n* Error *\n");
    console.log(`Error Type       : ${response.Error.Type}`);
    console.log(`Error Type Code  : ${response.Error.TypeCode}`);
    console.log(`Error Description: ${response.Error.Desc}`);
    console.log(`Error Desc Code  : ${response.Error.DescCode}`);
    return;
}
```


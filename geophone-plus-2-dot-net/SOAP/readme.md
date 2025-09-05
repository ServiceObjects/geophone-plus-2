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
// 1. Instantiate the service wrapper
GetPhoneInfoValidation getPhoneInfoValidation = new GetPhoneInfoValidation(true);

// 2. Build the input
//  Required fields:
//               PhoneNumber
//               TestType 
//               LicenseKey
//               IsLive
// 
// Optional:
//       TimeoutSeconds (default: 15)
string PhoneNumber = "8059631700";
string TestType = "FULL";

// 3 Call the service
PhoneInfoResponse response = getPhoneInfoValidation.GetPhoneInfo(PhoneNumber, TestType, licenseKey).Result;

// 4. Inspect results.
if (response.Error is null)
{
    if (response.PhoneInfo != null)
    {
        Console.WriteLine("\r\n* Phone Info *\r\n");
        Console.WriteLine($"SMS Address    : {response.PhoneInfo.SMSAddress}");
        Console.WriteLine($"MMS Address    : {response.PhoneInfo.MMSAddress}");
        Console.WriteLine($"Date First Seen: {response.PhoneInfo.DateFirstSeen}");
        Console.WriteLine($"Date of Porting: {response.PhoneInfo.DateOfPorting}");
        Console.WriteLine($"Note Codes     : {response.PhoneInfo.NoteCodes}");
        Console.WriteLine($"Note Desc      : {response.PhoneInfo.NoteDescriptions}");
        Console.WriteLine($"Tokens Used    : {response.PhoneInfo.TokensUsed}");

        Console.WriteLine("\r\n* Provider Details *\r\n");
        if (response.PhoneInfo.Provider != null)
        {
            Console.WriteLine($"Name     : {response.PhoneInfo.Provider.Name}");
            Console.WriteLine($"City     : {response.PhoneInfo.Provider.City}");
            Console.WriteLine($"State    : {response.PhoneInfo.Provider.State}");
            Console.WriteLine($"Line Type: {response.PhoneInfo.Provider.LineType}");
            Console.WriteLine($"Latitude : {response.PhoneInfo.Provider.Latitude}");
            Console.WriteLine($"Longitude: {response.PhoneInfo.Provider.Longitude}");
        }
        else
        {
            Console.WriteLine("No provider details found.");
        }

        Console.WriteLine("\r\n* Contacts *\r\n");
        if (response.PhoneInfo.Contacts?.Length > 0)
        {
            foreach (var contact in response.PhoneInfo.Contacts)
            {
                Console.WriteLine($"Name         : {contact.Name}");
                Console.WriteLine($"Address      : {contact.Address}");
                Console.WriteLine($"City         : {contact.City}");
                Console.WriteLine($"State        : {contact.State}");
                Console.WriteLine($"Postal Code  : {contact.PostalCode}");
                Console.WriteLine($"Phone Type   : {contact.PhoneType}");
                Console.WriteLine($"Latitude     : {contact.Latitude}");
                Console.WriteLine($"Longitude    : {contact.Longitude}");
                Console.WriteLine($"SIC Code     : {contact.SICCode}");
                Console.WriteLine($"SIC Desc     : {contact.SICDesc}");
                Console.WriteLine($"Quality Score: {contact.QualityScore}");
                Console.WriteLine("\r\n");
            }
        }
        else
        {
            Console.WriteLine("No contacts found.");
        }
    }
    else
    {
        Console.WriteLine("No phone info found.");
    }
}
else
{
    Console.WriteLine("\r\n* Error *\r\n");
    Console.WriteLine($"Error Type       : {response.Error.Type}");
    Console.WriteLine($"Error Type Code  : {response.Error.TypeCode}");
    Console.WriteLine($"Error Description: {response.Error.Desc}");
    Console.WriteLine($"Error Desc Code  : {response.Error.DescCode}");
}
```


![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# GPPL2 - GeoPhone Plus 2

DOTS GeoPhone Plus 2 (referred to as “GeoPhone Plus 2” or “GPPL 2”) is a publicly available XML web service that provides reverse phone lookup information about a US (or sometimes Canadian) phone number. The service provides name, address, city, state and lat/long, along with carrier exchange information.

This service provides Landline, Wireless and Toll free contact data are all available with one call to the service. GeoPhone Plus 2 can provide instant reverse-phone lookup verification to websites or data enhancement to contact lists. However, the output from GP must be considered carefully before the existence or non-existence of a given phone number is decided.

## [Service Objects Website](https://serviceobjects.com)
## [Developer Guide/Documentation](https://www.serviceobjects.com/docs/)

# GPPL2 - GetPhoneInfo

This is the basic operation for finding the reverse-lookup information. Given a phone number and test type, it will consult national directory-assistance databases to find the owner and address registered. The addresses returned are validated via third party address-validation technique. They are returned to you exactly as the phone carrier releases them. If you need these addresses to be validated, using Service Objects’ AddressValidation web services is highly recommended. Both the contact’s information and the phone company’s information are returned with this operation.

Two valuable bits of information are also retrieved – whether the phone line is for business or residential purposes, and whether the phone line is landline or wireless. By examining the WSDL, you may see that multiple groups of contact/exchange information are possible. Although they are possible in the XML, you will only see one exchange per output, always. It is common, however, to see multiple contacts per phone number (as people change numbers, or there may be multiple businesses at the same phone number.) It is highly recommended that you handle each of these contacts, rather than just the first contact returned.

## [GetPhoneInfo Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-geophone-plus-2/dots-geophone-plus-2/gppl2-getphoneinfo-recommended-operation/)

## GetPhoneInfo Request URLs (Query String Parameters)

>[!CAUTION]
>### *Important - Use query string parameters for all inputs.  Do not use path parameters since it will lead to errors due to optional parameters and special character issues.*


### JSON
#### Trial

https://trial.serviceobjects.com/gppl2/api.svc/GetPhoneInfoJson?PhoneNumber=8059631700&TestType=&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/gppl2/api.svc/GetPhoneInfoJson?PhoneNumber=8059631700&TestType=&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/gppl2/api.svc/GetPhoneInfoJson?PhoneNumber=8059631700&TestType=&LicenseKey={LicenseKey}

### XML
#### Trial

https://trial.serviceobjects.com/GPPL2/api.svc/GetPhoneInfo?PhoneNumber=8059631700&TestType=&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/GPPL2/api.svc/GetPhoneInfo?PhoneNumber=8059631700&TestType=&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/GPPL2/api.svc/GetPhoneInfo?PhoneNumber=8059631700&TestType=&LicenseKey={LicenseKey}

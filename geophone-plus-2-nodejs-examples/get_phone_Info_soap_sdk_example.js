import { GetPhoneInfoSoap } from '../geophone-plus-2-nodejs/src/SOAP/get_phone_Info_soap.js';

export async function getPhoneInfoSoapGO(licenseKey, isLive) {
    console.log("\n----------------------------------------------");
    console.log("GeoPhone Plus 2 - GetPhoneInfoInput - SOAP SDK");
    console.log("----------------------------------------------");

    const phone_number = "8059631700";
    const test_type = "FULL";
    const timeoutSeconds = 15;

    console.log("\n* Input *\n");
    console.log(`Phone Number   : ${phone_number}`);
    console.log(`Test Type      : ${test_type}`);
    console.log(`License Key    : ${licenseKey}`);
    console.log(`Is Live        : ${isLive}`);
    console.log(`Timeout Seconds: ${timeoutSeconds}`);

    try {
        const gppl2 = new GetPhoneInfoSoap(phone_number, phone_number, licenseKey, isLive);
        const response = await gppl2.getPhoneInfo();

        console.log("\n* Phone Info *\n");

        if (response.PhoneInfo) {
            console.log(`SMS Address      : ${response.PhoneInfo.SMSAddress}`);
            console.log(`MMS Address      : ${response.PhoneInfo.MMSAddress}`);
            console.log(`Date First Seen  : ${response.PhoneInfo.DateFirstSeen}`);
            console.log(`Date of Porting  : ${response.PhoneInfo.DateOfPorting}`);
            console.log(`Note Codes       : ${response.PhoneInfo.NoteCodes}`);
            console.log(`Note Descriptions: ${response.PhoneInfo.NoteDescriptions}`);
            console.log(`Tokens Used      : ${response.PhoneInfo.TokensUsed}`);

            console.log("\n* Provider Details *\n");
            if (response.PhoneInfo.Provider) {
                console.log(`Name     : ${response.PhoneInfo.Provider.Name}`);
                console.log(`City     : ${response.PhoneInfo.Provider.City}`);
                console.log(`State    : ${response.PhoneInfo.Provider.State}`);
                console.log(`Line Type: ${response.PhoneInfo.Provider.LineType}`);
                console.log(`Latitude : ${response.PhoneInfo.Provider.Latitude}`);
                console.log(`Longitude: ${response.PhoneInfo.Provider.Longitude}`);
            } else {
                console.log("No provider details found.");
            }

            console.log("\n* Contacts *\n");
            if (response.PhoneInfo.Contacts && response.PhoneInfo.Contacts.length > 0) {
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
            } else {
                console.log("No contacts found.");
            }
        } else {
            console.log("\n* Phone Info *\n");
            console.log("No phone info found.");
        }

        if (response.Error) {
            console.log("\n* Error *\n");
            console.log(`Error Type       : ${response.Error.Type}`);
            console.log(`Error Type Code  : ${response.Error.TypeCode}`);
            console.log(`Error Description: ${response.Error.Desc}`);
            console.log(`Error Desc Code  : ${response.Error.DescCode}`);
            return;
        }
    } catch (e) {
        console.log(`\nException occurred: ${e.message}`);
    }
}

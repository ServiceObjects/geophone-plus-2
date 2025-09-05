using geophone_plus_2_dot_net.SOAP;
using GPPL2Service;


namespace geophone_plus_2_dot_net_examples
{
    public class GetPhoneInfoSoapSdkExample
    {
        public static void Go(string licenseKey, bool isLive)
        {
            Console.WriteLine("\r\n----------------------------------------------");
            Console.WriteLine("GeoPhone Plus 2 - GetPhoneInfoInput - SOAP SDK");
            Console.WriteLine("----------------------------------------------");

            string PhoneNumber = "8059631700";
            string TestType = "FULL";

            Console.WriteLine("\r\n* Input *\r\n");
            Console.WriteLine($"Phone Number: {PhoneNumber}");
            Console.WriteLine($"Test Type   : {TestType}");
            Console.WriteLine($"License Key : {licenseKey}");
            Console.WriteLine($"Is Live     : {isLive}");

            GetPhoneInfoValidation getPhoneInfoValidation = new GetPhoneInfoValidation(isLive);
            PhoneInfoResponse response = getPhoneInfoValidation.GetPhoneInfo(PhoneNumber, TestType, licenseKey).Result;
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
        }
    }
}

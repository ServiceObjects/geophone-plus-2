using System.Web;

namespace geophone_plus_2_dot_net.REST
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects GeoPhone Plus 2 REST API's GetPhoneInfo endpoint,
    /// retrieving reverse phone lookup information (e.g., provider, contacts, SMS/MMS addresses) with fallback to a backup endpoint
    /// for reliability in live mode.
    /// </summary>
    public class GetPhoneInfoClient
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/gppl2/api.svc/";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/gppl2/api.svc/";
        private const string TrialBaseUrl = "https://trial.serviceobjects.com/gppl2/api.svc/";

        /// <summary>
        /// Synchronously calls the GetPhoneInfo REST endpoint to retrieve reverse phone lookup information,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.TypeCode == "3") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including phone number, test type, and license key.</param>
        /// <returns>Deserialized <see cref="GPPL2Response"/>.</returns>
        public static GPPL2Response Invoke(GetPhoneInfoInput input)
        {
            //Use query string parameters so missing/options fields don't break
            //the URL as path parameters would.
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            GPPL2Response response = Helper.HttpGet<GPPL2Response>(url, input.TimeoutSeconds);

            // Fallback on error in live mode
            if (input.IsLive && !IsValid(response))
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                GPPL2Response fallbackResponse = Helper.HttpGet<GPPL2Response>(fallbackUrl, input.TimeoutSeconds);
                return fallbackResponse;
            }

            return response;
        }

        /// <summary>
        /// Asynchronously calls the GetPhoneInfo REST endpoint to retrieve reverse phone lookup information,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.TypeCode == "3") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including phone number, test type, and license key.</param>
        /// <returns>Deserialized <see cref="GPPL2Response"/>.</returns>
        public static async Task<GPPL2Response> InvokeAsync(GetPhoneInfoInput input)
        {
            // Use query string parameters so missing/optional fields don't break
            // the URL as path parameters would.
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            GPPL2Response response = await Helper.HttpGetAsync<GPPL2Response>(url, input.TimeoutSeconds).ConfigureAwait(false);
            if (input.IsLive && !IsValid(response))
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                GPPL2Response fallbackResponse = await Helper.HttpGetAsync<GPPL2Response>(fallbackUrl, input.TimeoutSeconds).ConfigureAwait(false);
                return fallbackResponse;
            }

            return response;
        }

        // Build the full request URL, including URL-encoded query string
        public static string BuildUrl(GetPhoneInfoInput input, string baseUrl)
        {
            string qs = $"GetPhoneInfoJson?" +
                     $"PhoneNumber={HttpUtility.UrlEncode(input.PhoneNumber)}" +
                     $"&TestType={HttpUtility.UrlEncode(input.TestType)}" +
                     $"&LicenseKey={HttpUtility.UrlEncode(input.LicenseKey)}";
            return baseUrl + qs;
        }

        private static bool IsValid(GPPL2Response response) => 
            response?.Error == null || response.Error.TypeCode != "3";

        /// <summary>
        /// This is the basic operation for finding the reverse-lookup information.Given a phone number and test type, it will consult national directory-assistance databases to find the owner and address registered.The addresses returned are validated via third party address-validation technique. They are returned to you exactly as the phone carrier releases them.If you need these addresses to be validated, using Service Objects’ AddressValidation web services is highly recommended.Both the contact’s information and the phone company’s information are returned with this operation. Two valuable bits of information are also retrieved – whether the phone line is for business or residential purposes, and whether the phone line is landline or wireless.By examining the WSDL, you may see that multiple groups of contact/exchange information are possible. Although they are possible in the XML, you will only see one exchange per output, always.It is common, however, to see multiple contacts per phone number (as people change numbers, or there may be multiple businesses at the same phone number.) It is highly recommended that you handle each of these contacts, rather than just the first contact returned.
        /// </summary>
        /// <param name="PhoneNumber">10 digit phone number</param>
        /// <param name="TestType">“FULL”, “BASIC” or “NORMAL”</param>
        /// <param name="LicenseKey">Your license key to use the service</param>
        /// <param name="IsLive">Option to use live service or trial service</param>
        /// <param name="TimeoutSeconds">Timeout, in seconds, for the call to the service.  </param>
        public record GetPhoneInfoInput(
            string PhoneNumber = "",
            string TestType = "",
            string LicenseKey = "",
            bool IsLive = true,
            int TimeoutSeconds = 15
        );
    }
}

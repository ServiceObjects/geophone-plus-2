using System;
using System.Threading.Tasks;
using GPPL2Service;

namespace geophone_plus_2_dot_net.SOAP
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects GeoPhone Plus 2 SOAP service's GetPhoneInfo operation,
    /// retrieving reverse phone lookup information (e.g., provider, contacts, SMS/MMS addresses) with fallback to a backup endpoint
    /// for reliability in live mode.
    /// </summary>
    public class GetPhoneInfoValidation
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/GPPL2/api.svc/GeoPhonePlusSoap";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/GPPL2/api.svc/GeoPhonePlusSoap";
        private const string TrialBaseUrl = "https://trial.serviceobjects.com/GPPL2/api.svc/GeoPhonePlusSoap";

        private readonly string _primaryUrl;
        private readonly string _backupUrl;
        private readonly int _timeoutMs;
        private readonly bool _isLive;

        /// <summary>
        /// Initializes URLs/timeout/IsLive.
        /// </summary>
        public GetPhoneInfoValidation(bool isLive)
        {
            _timeoutMs = 10000;
            _isLive = isLive;

            _primaryUrl = isLive ? LiveBaseUrl : TrialBaseUrl;
            _backupUrl = isLive ? BackupBaseUrl : TrialBaseUrl;

            if (string.IsNullOrWhiteSpace(_primaryUrl))
                throw new InvalidOperationException("Primary URL not set.");
            if (string.IsNullOrWhiteSpace(_backupUrl))
                throw new InvalidOperationException("Backup URL not set.");
        }

        /// <summary>
        /// This is the basic operation for finding the reverse-lookup information.Given a phone number and test type, it will consult national directory-assistance databases to find the owner and address registered.The addresses returned are validated via third party address-validation technique. They are returned to you exactly as the phone carrier releases them.If you need these addresses to be validated, using Service Objects’ AddressValidation web services is highly recommended.Both the contact’s information and the phone company’s information are returned with this operation. Two valuable bits of information are also retrieved – whether the phone line is for business or residential purposes, and whether the phone line is landline or wireless.By examining the WSDL, you may see that multiple groups of contact/exchange information are possible. Although they are possible in the XML, you will only see one exchange per output, always.It is common, however, to see multiple contacts per phone number (as people change numbers, or there may be multiple businesses at the same phone number.) It is highly recommended that you handle each of these contacts, rather than just the first contact returned.
        /// </summary>
        /// <param name="PhoneNumber">The 10 digit phone number</param>
        /// <param name="TestType">The type of validation to perform ("FULL", "BASIC", or "NORMAL").</param>
        /// <param name="LicenseKey">Your license key to use the service
        /// <returns>A <see cref="Task{PhoneInfoResponse}"/> containing a <see cref="PhoneInfoResponse"/> object with reverse phone lookup details or an error.</returns>
        /// <exception cref="Exception">Thrown if both primary and backup endpoints fail.</exception>
        public async Task<PhoneInfoResponse> GetPhoneInfo(string PhoneNumber, string TestType, string LicenseKey)
        {
            GeoPhonePlusClient clientPrimary = null;
            GeoPhonePlusClient clientBackup = null;

            try
            {
                // Attempt Primary_PLL
                clientPrimary = new GeoPhonePlusClient();
                clientPrimary.Endpoint.Address = new System.ServiceModel.EndpointAddress(_primaryUrl);
                clientPrimary.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                PhoneInfoResponse response = await clientPrimary.GetPhoneInfoAsync(
                    PhoneNumber, TestType, LicenseKey).ConfigureAwait(false);

                if (_isLive && !IsValid(response))
                {
                    throw new InvalidOperationException("Primary endpoint returned null or a fatal TypeCode=3 error for GetPhoneInfo");
                }
                return response;
            }
            catch (Exception primaryEx)
            {

                try
                {
                    clientBackup = new GeoPhonePlusClient();
                    clientBackup.Endpoint.Address = new System.ServiceModel.EndpointAddress(_backupUrl);
                    clientBackup.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                    return await clientBackup.GetPhoneInfoAsync(
                        PhoneNumber, TestType, LicenseKey).ConfigureAwait(false);
                }
                catch (Exception backupEx)
                {
                    throw new Exception(
                        $"Both primary and backup endpoints failed.\n" +
                        $"Primary error: {primaryEx.Message}\n" +
                        $"Backup error: {backupEx.Message}");
                }
                finally
                {
                    clientBackup?.Close();
                }
            }
            finally
            {
                clientPrimary?.Close();
            }
        }
        private static bool IsValid(PhoneInfoResponse response) => response?.Error == null || response.Error.TypeCode != "3";
    }
}
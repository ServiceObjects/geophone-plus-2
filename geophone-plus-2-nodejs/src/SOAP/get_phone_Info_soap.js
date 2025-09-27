import { soap } from 'strong-soap';

/**
 * <summary>
 * A class that provides functionality to call the ServiceObjects GeoPhone Plus 2 SOAP service's GetPhoneInfo endpoint,
 * retrieving reverse phone lookup information with fallback to a backup endpoint for reliability in live mode.
 * </summary>
 */
class GetPhoneInfoSoap {
    /**
     * <summary>
     * Initializes a new instance of the GetPhoneInfoSoap class with the provided input parameters,
     * setting up primary and backup WSDL URLs based on the live/trial mode.
     * </summary>
     * @param {string} phoneNumber - The 10 digit phone number.
     * @param {string} testType - The type of validation to perform ('FULL', 'BASIC', or 'NORMAL').
     * @param {string} licenseKey - Your license key to use the service. 
     * @param {boolean} isLive - Value to determine whether to use the live or trial servers.
     * @param {number} timeoutSeconds - Timeout, in seconds, for the call to the service.
     * @throws {Error} Thrown if LicenseKey is empty or null.
     */
    constructor(PhoneNumber, TestType, LicenseKey, isLive = true, timeoutSeconds = 15) {

        this.args = {
            PhoneNumber,
            TestType,
            LicenseKey
        };

        this.isLive = isLive;
        this.timeoutSeconds = timeoutSeconds;

        this.liveBaseUrl = "https://sws.serviceobjects.com/GPPL2/api.svc?singlewsdl";
        this.backupBaseUrl = "https://swsbackup.serviceobjects.com/GPPL2/api.svc?singlewsdl";
        this.trialBaseUrl = "https://trial.serviceobjects.com/GPPL2/api.svc?singlewsdl";

        this._primaryWsdl = this.isLive ? this.liveBaseUrl : this.trialBaseUrl;
        this._backupWsdl = this.isLive ? this.backupBaseUrl : this.trialBaseUrl;
    }

    /**
     * <summary>
     * Asynchronously calls the GetPhoneInfo SOAP endpoint, attempting the primary endpoint
     * first and falling back to the backup if the response is invalid (Error.TypeCode == '3') in live mode
     * or if the primary call fails.
     * </summary>
     * <returns type="Promise<GPPL2Response>">A promise that resolves to a GPPL2Response object containing reverse phone lookup details or an error.</returns>
     * <exception cref="Error">Thrown if both primary and backup calls fail, with detailed error messages.</exception>
     */
    async getPhoneInfo() {
        try {
            const primaryResult = await this._callSoap(this._primaryWsdl, this.args);

            if (this.isLive && !this._isValid(primaryResult)) {
                console.warn("Primary returned Error.TypeCode == '3', falling back to backup...");
                const backupResult = await this._callSoap(this._backupWsdl, this.args);
                return backupResult;
            }

            return primaryResult;
        } catch (primaryErr) {
            try {
                const backupResult = await this._callSoap(this._backupWsdl, this.args);
                return backupResult;
            } catch (backupErr) {
                throw new Error(`Both primary and backup calls failed:\nPrimary: ${primaryErr.message}\nBackup: ${backupErr.message}`);
            }

        }
    }

    /**
     * <summary>
     * Performs a SOAP service call to the specified WSDL URL with the given arguments,
     * creating a client and processing the response into a GPPL2Response object.
     * </summary>
     * <param name="wsdlUrl" type="string">The WSDL URL of the SOAP service endpoint (primary or backup).</param>
     * <param name="args" type="Object">The arguments to pass to the GetPhoneInfo method.</param>
     * <returns type="Promise<GPPL2Response>">A promise that resolves to a GPPL2Response object containing the SOAP response data.</returns>
     * <exception cref="Error">Thrown if the SOAP client creation fails, the service call fails, or the response cannot be parsed.</exception>
     */
    _callSoap(wsdlUrl, args) {
        return new Promise((resolve, reject) => {
            soap.createClient(wsdlUrl, { timeout: this.timeoutSeconds * 1000 }, (err, client) => {
                if (err) return reject(err);

                client.GetPhoneInfo(args, (err, result) => {
                    const rawData = result?.GetPhoneInfoResult;
                    try {
                        if (!rawData) {
                            return reject(new Error("SOAP response is empty or undefined."));
                        }
                        resolve(rawData);
                    } catch (parseErr) {
                        reject(new Error(`Failed to parse SOAP response: ${parseErr.message}`));
                    }
                });
            });
        });
    }

    /**
     * <summary>
     * Checks if a SOAP response is valid by verifying that it exists and either has no Error object
     * or the Error.TypeCode is not equal to '1'.
     * </summary>
     * <param name="response" type="GPPL2Response">The GPPL2Response object to validate.</param>
     * <returns type="boolean">True if the response is valid, false otherwise.</returns>
     */
    _isValid(response) {
        return response && (!response.Error || response.Error.TypeCode !== "3");
    }
}

export { GetPhoneInfoSoap };
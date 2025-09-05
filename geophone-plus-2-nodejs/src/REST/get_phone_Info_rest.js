import axios from 'axios';
import querystring from 'querystring';
import { GPPL2Response } from './gppl2_response.js';

/**
 * @constant
 * @type {string}
 * @description The base URL for the live ServiceObjects GeoPhone Plus 2 API service.
 */
const LiveBaseUrl = 'https://sws.serviceobjects.com/gppl2/api.svc/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the backup ServiceObjects GeoPhone Plus 2 API service.
 */
const BackupBaseUrl = 'https://swsbackup.serviceobjects.com/gppl2/api.svc/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the trial ServiceObjects GeoPhone Plus 2 API service.
 */
const TrialBaseUrl = 'https://trial.serviceobjects.com/gppl2/api.svc/';

/**
 * <summary>
 * Checks if a response from the API is valid by verifying that it either has no Error object
 * or the Error.TypeCode is not equal to '1'.
 * </summary>
 * <param name="response" type="Object">The API response object to validate.</param>
 * <returns type="boolean">True if the response is valid, false otherwise.</returns>
 */
const isValid = (response) => !response?.Error || response.Error.TypeCode !== '3';

/**
 * <summary>
 * Constructs a full URL for the GetPhoneInfo API endpoint by combining the base URL
 * with query parameters derived from the input parameters.
 * </summary>
 * <param name="params" type="Object">An object containing all the input parameters.</param>
 * <param name="baseUrl" type="string">The base URL for the API service (live, backup, or trial).</param>
 * <returns type="string">The constructed URL with query parameters.</returns>
 */
const buildUrl = (params, baseUrl) =>
    `${baseUrl}GetPhoneInfoJson?${querystring.stringify(params)}`;

/**
 * <summary>
 * Performs an HTTP GET request to the specified URL with a given timeout.
 * </summary>
 * <param name="url" type="string">The URL to send the GET request to.</param>
 * <param name="timeoutSeconds" type="number">The timeout duration in seconds for the request.</param>
 * <returns type="Promise<GPPL2Response>">A promise that resolves to a GPPL2Response object containing the API response data.</returns>
 * <exception cref="Error">Thrown if the HTTP request fails, with a message detailing the error.</exception>
 */
const httpGet = async (url, timeoutSeconds) => {
    try {
        const response = await axios.get(url, { timeout: timeoutSeconds * 1000 });
        return new GPPL2Response(response.data);
    } catch (error) {
        throw new Error(`HTTP request failed: ${error.message}`);
    }
};

/**
 * <summary>
 * Provides functionality to call the ServiceObjects GeoPhone Plus 2 API's GetPhoneInfo endpoint,
 * retrieving reverse phone lookup information with fallback to a backup endpoint for reliability in live mode.
 * </summary>
 */
const GetPhoneInfoClient = {
    /**
     * <summary>
     * Asynchronously invokes the GetPhoneInfo API endpoint, attempting the primary endpoint
     * first and falling back to the backup if the response is invalid (Error.TypeCode == '3') in live mode.
     * </summary>
     * @param {string} PhoneNumber - 10 digit phone number.
     * @param {string} TestType - The type of validation to perform ('FULL', 'BASIC', or 'NORMAL').
     * @param {string} LicenseKey - Your license key to use the service
     * @param {boolean} isLive - Value to determine whether to use the live or trial servers.
     * @param {number} timeoutSeconds - Timeout, in seconds, for the call to the service.
     * @returns {Promise<GPPL2Response>} - A promise that resolves to a GPPL2Response object.
     */
    async invokeAsync(PhoneNumber, TestType, LicenseKey, isLive = true, timeoutSeconds = 15) {
        const params = {
            PhoneNumber,
            TestType,
            LicenseKey
        };

        const url = buildUrl(params, isLive ? LiveBaseUrl : TrialBaseUrl);
        let response = await httpGet(url, timeoutSeconds);

        if (isLive && !isValid(response)) {
            const fallbackUrl = buildUrl(params, BackupBaseUrl);
            const fallbackResponse = await httpGet(fallbackUrl, timeoutSeconds);
            return isValid(fallbackResponse) ? fallbackResponse : response;
        }

        return response;
    },

    /**
     * <summary>
     * Synchronously invokes the GetPhoneInfo API endpoint by wrapping the async call
     * and awaiting its result immediately.
     * </summary>
     * @returns {GPPL2Response} - A GPPL2Response object with reverse phone lookup details or an error.
     */
    invoke(PhoneNumber, TestType, LicenseKey, isLive = true, timeoutSeconds = 15) {
        return (async () => await this.invokeAsync(
            PhoneNumber, TestType, LicenseKey, isLive, timeoutSeconds
        ))();
    }
};

export { GetPhoneInfoClient, GPPL2Response };
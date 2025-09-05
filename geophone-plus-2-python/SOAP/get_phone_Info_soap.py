from suds.client import Client
from suds import WebFault
from suds.sudsobject import Object

class GetPhoneInfoSoap:

    def __init__(self, license_key: str, is_live: bool, timeout_ms: int = 10000):
        """
        license_key: Service Objects GPPL2 license key.
        is_live: Whether to use live or trial endpoints
        timeout_ms: SOAP call timeout in milliseconds
        """

        self._timeout_s = timeout_ms / 1000.0  # Convert to seconds
        self._is_live = is_live
        self.license_key = license_key

        # WSDL URLs for primary and backup endpoints
        self._primary_wsdl = (
            "https://sws.serviceobjects.com/GPPL2/api.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/GPPL2/api.svc?wsdl"
        )
        self._backup_wsdl = (
            "https://swsbackup.serviceobjects.com/GPPL2/api.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/GPPL2/api.svc?wsdl"
        )

    def get_phone_info(self, phone_number: str, test_type: str) -> Object:
        """
        Calls the GeoPhone Plus 2 GetPhoneInfo SOAP API to retrieve the information.

        Parameters:
        phone_number (str): The 10 digit phone number.
        test_type (str): The type of validation to perform ('FULL', 'BASIC', or 'NORMAL').
        license_key: Service Objects GeoPhone license key.
        is_live: whether to use live or trial endpoints
        timeout_ms: SOAP call timeout in milliseconds

        Returns:
            Object: Parsed SOAP response with phone information or error details.
        """

        # Common kwargs for both calls
        call_kwargs = dict(
            PhoneNumber= phone_number,
            TestType= test_type,
            LicenseKey= self.license_key
        )

        # Attempt primary
        try:
            client = Client(self._primary_wsdl, timeout=self._timeout_s)
            # Override endpoint URL if needed:
            # client.set_options(location=self._primary_wsdl.replace('?wsdl','/soap'))
            response = client.service.GetPhoneInfo(**call_kwargs)

            # If response is None or fatal error code, trigger fallback
            if response is None or (hasattr(response, 'Error') and response.Error and response.Error.TypeCode == '3'):
                raise ValueError("Primary returned no result or fatal Error.TypeCode=3")

            return response

        except (WebFault, ValueError, Exception) as primary_ex:
                try:
                    client = Client(self._backup_wsdl, timeout=self._timeout_s)
                    response = client.service.GetPhoneInfo(**call_kwargs)

                    if response is None:
                        raise ValueError("Backup returned no result")

                    return response

                except (WebFault, Exception) as backup_ex:
                    # Raise a combined error if both attempts fail
                    msg = (
                        "Both primary and backup endpoints failed.\n"
                        f"Primary error: {str(primary_ex)}\n"
                        f"Backup error: {str(backup_ex)}"
                    )
                    raise RuntimeError(msg)
           
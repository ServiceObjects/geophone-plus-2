
import requests
from gppl2_response import GPPL2Response, Provider, Contacts, PhoneInfo, Error

# Endpoint URLs for GeoPhone Plus 2 GetPhoneInfo REST API
primary_url = 'https://sws.serviceobjects.com/gppl2/api.svc/GetPhoneInfoJson?'
backup_url = 'https://swsbackup.serviceobjects.com/gppl2/api.svc/GetPhoneInfoJson?'
trial_url = 'https://trial.serviceobjects.com/gppl2/api.svc/GetPhoneInfoJson?'

def get_phone_info(
    phone_number: str,
    test_type: str,
    license_key: str,
    is_live: bool = True,
    timeout_seconds: int = 15
) -> GPPL2Response:
    """
    Call GeoPhone Plus 2 GetPhoneInfo API to retrieve reverse phone lookup information.

    Parameters:
        phone_number: The 10 digit phone number.
        test_type: The type of validation to perform ('FULL', 'BASIC', or 'NORMAL').
        license_key: Your license key to use the service
        is_live: Value to determine whether to use the live or trial servers (default: True).
        timeout_seconds: Timeout, in seconds, for the call to the service (default: 15).

    Returns:
        GPPL2Response: Parsed JSON response with phone information or error details.
    """
    params = {
        'PhoneNumber': phone_number,
        'TestType': test_type,
        'LicenseKey': license_key
    }

    # Select the base URL: production vs trial
    url = primary_url if is_live else trial_url

    # Attempt primary (or trial) endpoint first
    try:
        response = requests.get(url, params=params, timeout=timeout_seconds)
        response.raise_for_status()
        data = response.json()

        # If API returned an error in JSON payload, trigger fallback
        error = getattr(response, 'Error', None)
        if not (error is None or getattr(error, 'TypeCode', None) != "3"):
            if is_live:
            # Try backup URL
              response = requests.get(backup_url, params=params, timeout=timeout_seconds)
              response.raise_for_status()
              data = response.json()

            # If still error, propagate exception
            if 'Error' in data:
                raise RuntimeError(f"GPPL2 service error: {data['Error']}")

            else:
              # Trial mode error is terminal
              raise RuntimeError(f"GPPL2 trial error: {data['Error']}")

        # Convert JSON response to GPPL2Response for structured access
        error = Error(**data.get('Error', {})) if data.get('Error') else None
        phone_info = None
        if data.get('PhoneInfo'):
            provider = Provider(**data['PhoneInfo'].get('Provider', {})) if data['PhoneInfo'].get('Provider') else None
            contacts = [Contacts(**contact) for contact in data['PhoneInfo'].get('Contacts', [])] if data['PhoneInfo'].get('Contacts') else None
            phone_info = PhoneInfo(
                Provider=provider,
                Contacts=contacts,
                SMSAddress=data['PhoneInfo'].get('SMSAddress'),
                MMSAddress=data['PhoneInfo'].get('MMSAddress'),
                DateFirstSeen=data['PhoneInfo'].get('DateFirstSeen'),
                DateOfPorting=data['PhoneInfo'].get('DateOfPorting'),
                NoteCodes=data['PhoneInfo'].get('NoteCodes'),
                NoteDescriptions=data['PhoneInfo'].get('NoteDescriptions'),
                TokensUsed=data['PhoneInfo'].get('TokensUsed')
            )

        return GPPL2Response(
            PhoneNumber=data.get('PhoneNumber'),
            TestType=data.get('TestType'),
            LicenseKey=data.get('LicenseKey'),
            PhoneInfo=phone_info,
            Error=error
        )

    except requests.RequestException as req_exc:
        # Network or HTTP-level error occurred
        if is_live:
            try:
                # Fallback to backup URL on network failure
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()
                if 'Error' in data:
                    raise RuntimeError(f"GPPL2 backup error: {data['Error']}") from req_exc

                # Convert JSON response to GPPL2Response for structured access
                error = Error(**data.get('Error', {})) if data.get('Error') else None
                phone_info = None
                if data.get('PhoneInfo'):
                    provider = Provider(**data['PhoneInfo'].get('Provider', {})) if data['PhoneInfo'].get('Provider') else None
                    contacts = [Contacts(**contact) for contact in data['PhoneInfo'].get('Contacts', [])] if data['PhoneInfo'].get('Contacts') else None
                    phone_info = PhoneInfo(
                        Provider=provider,
                        Contacts=contacts,
                        SMSAddress=data['PhoneInfo'].get('SMSAddress'),
                        MMSAddress=data['PhoneInfo'].get('MMSAddress'),
                        DateFirstSeen=data['PhoneInfo'].get('DateFirstSeen'),
                        DateOfPorting=data['PhoneInfo'].get('DateOfPorting'),
                        NoteCodes=data['PhoneInfo'].get('NoteCodes'),
                        NoteDescriptions=data['PhoneInfo'].get('NoteDescriptions'),
                        TokensUsed=data['PhoneInfo'].get('TokensUsed')
                    )

                return GPPL2Response(
                    PhoneNumber=data.get('PhoneNumber'),
                    TestType=data.get('TestType'),
                    LicenseKey=data.get('LicenseKey'),
                    PhoneInfo=phone_info,
                    Error=error
                )
            except Exception as backup_exc:
                raise RuntimeError("GPPL2 service unreachable on both endpoints") from backup_exc
        else:
            raise RuntimeError(f"GPPL2 trial error: {str(req_exc)}") from req_exc
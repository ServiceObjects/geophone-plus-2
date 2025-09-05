import sys
import os

sys.path.insert(0, os.path.abspath("../geophone-plus-2-python/REST"))

from get_phone_Info_rest import get_phone_info


def get_phone_info_rest_sdk_go(is_live: bool, license_key: str) -> None:
    print("\n----------------------------------------------")
    print("GeoPhone Plus 2 - GetPhoneInfoInput - REST SDK")
    print("----------------------------------------------")

    phone_number = "8059631700"
    test_type = "FULL"
    timeout_seconds = 15

    print("\n* Input *\n")
    print(f"Phone Number   : {phone_number}")
    print(f"Test Type      : {test_type}")
    print(f"License Key    : {license_key}")
    print(f"Is Live        : {is_live}")
    print(f"Timeout Seconds: {timeout_seconds}")

    try:
        response = get_phone_info(
            phone_number, test_type, license_key, is_live, timeout_seconds
        )

        if response.Error is None:
            print("\n* Phone Info *\n")
            if response.PhoneInfo:
                print(f"SMS Address      : {response.PhoneInfo.SMSAddress}")
                print(f"MMS Address      : {response.PhoneInfo.MMSAddress}")
                print(f"Date First Seen  : {response.PhoneInfo.DateFirstSeen}")
                print(f"Date of Porting  : {response.PhoneInfo.DateOfPorting}")
                print(f"Note Codes       : {response.PhoneInfo.NoteCodes}")
                print(f"Note Descriptions: {response.PhoneInfo.NoteDescriptions}")
                print(f"Tokens Used      : {response.PhoneInfo.TokensUsed}")

                print("\n* Provider Details *\n")
                if response.PhoneInfo.Provider:
                    print(f"Name     : {response.PhoneInfo.Provider.Name}")
                    print(f"City     : {response.PhoneInfo.Provider.City}")
                    print(f"State    : {response.PhoneInfo.Provider.State}")
                    print(f"Line Type: {response.PhoneInfo.Provider.LineType}")
                    print(f"Latitude : {response.PhoneInfo.Provider.Latitude}")
                    print(f"Longitude: {response.PhoneInfo.Provider.Longitude}")
                else:
                    print("No provider details found.")

                print("\n* Contacts *\n")
                if hasattr(response.PhoneInfo, "Contacts") and response.PhoneInfo.Contacts:
                    for contact in response.PhoneInfo.Contacts:
                        print(f"Name           : {contact.Name}")
                        print(f"Address        : {contact.Address}")
                        print(f"City           : {contact.City}")
                        print(f"State          : {contact.State}")
                        print(f"Postal Code    : {contact.PostalCode}")
                        print(f"Phone Type     : {contact.PhoneType}")
                        print(f"Latitude       : {contact.Latitude}")
                        print(f"Longitude      : {contact.Longitude}")
                        print(f"SIC Code       : {contact.SICCode}")
                        print(f"SIC Description: {contact.SICDesc}")
                        print(f"Quality Score  : {contact.QualityScore}")
                        print("")
                else:
                    print("No contacts found.")
            else:
                print("No phone info found.")
        else:
            print("\n* Error *\n")
            print(f"Error Type       : {response.Error.Type}")
            print(f"Error Type Code  : {response.Error.TypeCode}")
            print(f"Error Description: {response.Error.Desc}")
            print(f"Error Desc Code  : {response.Error.DescCode}")

    except Exception as e:
        print(f"\nException occurred: {str(e)}")


from dataclasses import dataclass
from typing import Optional, List

@dataclass
class Provider:
    Name: Optional[str] = None
    City: Optional[str] = None
    State: Optional[str] = None
    LineType: Optional[str] = None
    Latitude: Optional[str] = None
    Longitude: Optional[str] = None

    def __str__(self) -> str:
        return (f"Provider: Name={self.Name}, City={self.City}, State={self.State}, "
                f"LineType={self.LineType}, Latitude={self.Latitude}, Longitude={self.Longitude}")

@dataclass
class Contacts:
    Name: Optional[str] = None
    Address: Optional[str] = None
    City: Optional[str] = None
    State: Optional[str] = None
    PostalCode: Optional[str] = None
    PhoneType: Optional[str] = None
    Latitude: Optional[str] = None
    Longitude: Optional[str] = None
    SICCode: Optional[str] = None
    SICDesc: Optional[str] = None
    QualityScore: Optional[str] = None

    def __str__(self) -> str:
        return (f"Contacts: Name={self.Name}, Address={self.Address}, City={self.City}, "
                f"State={self.State}, PostalCode={self.PostalCode}, PhoneType={self.PhoneType}, "
                f"Latitude={self.Latitude}, Longitude={self.Longitude}, SICCode={self.SICCode}, "
                f"SICDesc={self.SICDesc}, QualityScore={self.QualityScore}")

@dataclass
class PhoneInfo:
    Provider: Optional[Provider] = None
    Contacts: Optional[List[Contacts]] = None
    SMSAddress: Optional[str] = None
    MMSAddress: Optional[str] = None
    DateFirstSeen: Optional[str] = None
    DateOfPorting: Optional[str] = None
    NoteCodes: Optional[str] = None
    NoteDescriptions: Optional[str] = None
    TokensUsed: Optional[str] = None

    def __str__(self) -> str:
        contacts = ", ".join(str(c) for c in self.Contacts) if self.Contacts else "None"
        provider = str(self.Provider) if self.Provider else "None"
        return (f"PhoneInfo: Provider={provider}, Contacts=[{contacts}], SMSAddress={self.SMSAddress}, "
                f"MMSAddress={self.MMSAddress}, DateFirstSeen={self.DateFirstSeen}, "
                f"DateOfPorting={self.DateOfPorting}, NoteCodes={self.NoteCodes}, "
                f"NoteDescriptions={self.NoteDescriptions}, TokensUsed={self.TokensUsed}")

@dataclass
class Error:
    Type: Optional[str] = None
    TypeCode: Optional[str] = None
    Desc: Optional[str] = None
    DescCode: Optional[str] = None

    def __str__(self) -> str:
        return (f"Error: Type={self.Type}, TypeCode={self.TypeCode}, Desc={self.Desc}, "
                f"DescCode={self.DescCode}")

@dataclass
class GPPL2Response:
    PhoneNumber: Optional[str] = None
    TestType: Optional[str] = None
    LicenseKey: Optional[str] = None
    PhoneInfo: Optional[PhoneInfo] = None
    Error: Optional[Error] = None

    def __str__(self) -> str:
        phone_info = str(self.PhoneInfo) if self.PhoneInfo else "None"
        error = str(self.Error) if self.Error else "None"
        return (f"GPPL2Response: PhoneNumber={self.PhoneNumber}, TestType={self.TestType}, "
                f"LicenseKey={self.LicenseKey}, PhoneInfo={phone_info}")
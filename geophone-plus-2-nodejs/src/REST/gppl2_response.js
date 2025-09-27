export class Provider {
    constructor(data = {}) {
        this.Name = data.Name;
        this.City = data.City;
        this.State = data.State;
        this.LineType = data.LineType;
        this.Latitude = data.Latitude;
        this.Longitude = data.Longitude;
    }

    toString() {
        return `Provider: Name = ${this.Name}, City = ${this.City}, State = ${this.State}, LineType = ${this.LineType}, Latitude = ${this.Latitude}, Longitude = ${this.Longitude}`;
    }
}

export class Contacts {
    constructor(data = {}) {
        this.Name = data.Name;
        this.Address = data.Address;
        this.City = data.City;
        this.State = data.State;
        this.PostalCode = data.PostalCode;
        this.PhoneType = data.PhoneType;
        this.Latitude = data.Latitude;
        this.Longitude = data.Longitude;
        this.SICCode = data.SICCode;
        this.SICDesc = data.SICDesc;
        this.QualityScore = data.QualityScore;
    }

    toString() {
        return `Contacts: Name = ${this.Name}, Address = ${this.Address}, City = ${this.City}, State = ${this.State}, PostalCode = ${this.PostalCode}, PhoneType = ${this.PhoneType}, Latitude = ${this.Latitude}, Longitude = ${this.Longitude}, SICCode = ${this.SICCode}, SICDesc = ${this.SICDesc}, QualityScore = ${this.QualityScore}`;
    }
}

export class PhoneInfo {
    constructor(data = {}) {
        this.Provider = data.Provider ? new Provider(data.Provider) : null;
        this.Contacts = (data.Contacts || []).map(contact => new Contacts(contact));
        this.SMSAddress = data.SMSAddress;
        this.MMSAddress = data.MMSAddress;
        this.DateFirstSeen = data.DateFirstSeen;
        this.DateOfPorting = data.DateOfPorting;
        this.NoteCodes = data.NoteCodes;
        this.NoteDescriptions = data.NoteDescriptions;
        this.TokensUsed = data.TokensUsed;
    }

    toString() {
        const contactsString = this.Contacts.length
            ? this.Contacts.map(contact => contact.toString()).join(', ')
            : 'null';
        return `PhoneInfo: Provider = ${this.Provider ? this.Provider.toString() : 'null'}, Contacts = [${contactsString}], SMSAddress = ${this.SMSAddress}, MMSAddress = ${this.MMSAddress}, DateFirstSeen = ${this.DateFirstSeen}, DateOfPorting = ${this.DateOfPorting}, NoteCodes = ${this.NoteCodes}, NoteDescriptions = ${this.NoteDescriptions}, TokensUsed = ${this.TokensUsed}`;
    }
}

export class Error {
    constructor(data = {}) {
        this.Type = data.Type;
        this.TypeCode = data.TypeCode;
        this.Desc = data.Desc;
        this.DescCode = data.DescCode;
    }

    toString() {
        return `Error: Type = ${this.Type}, TypeCode = ${this.TypeCode}, Desc = ${this.Desc}, DescCode = ${this.DescCode}`;
    }
}

export class GPPL2Response {
    constructor(data = {}) {
        this.PhoneNumber = data.PhoneNumber;
        this.TestType = data.TestType;
        this.LicenseKey = data.LicenseKey;
        this.PhoneInfo = data.PhoneInfo ? new PhoneInfo(data.PhoneInfo) : null;
        this.Error = data.Error ? new Error(data.Error) : null;
    }

    toString() {
        return `GPPL2Response: PhoneNumber = ${this.PhoneNumber}, TestType = ${this.TestType}, LicenseKey = ${this.LicenseKey}, PhoneInfo = ${this.PhoneInfo ? this.PhoneInfo.toString() : 'null'}, Error = ${this.Error ? this.Error.toString() : 'null'}`;
    }
}

export default GPPL2Response;
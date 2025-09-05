export class Provider {
    constructor(data = {}) {
        this.Name = data.Name || null;
        this.City = data.City || null;
        this.State = data.State || null;
        this.LineType = data.LineType || null;
        this.Latitude = data.Latitude || null;
        this.Longitude = data.Longitude || null;
    }

    toString() {
        return `Provider: Name = ${this.Name}, City = ${this.City}, State = ${this.State}, LineType = ${this.LineType}, Latitude = ${this.Latitude}, Longitude = ${this.Longitude}`;
    }
}

export class Contacts {
    constructor(data = {}) {
        this.Name = data.Name || null;
        this.Address = data.Address || null;
        this.City = data.City || null;
        this.State = data.State || null;
        this.PostalCode = data.PostalCode || null;
        this.PhoneType = data.PhoneType || null;
        this.Latitude = data.Latitude || null;
        this.Longitude = data.Longitude || null;
        this.SICCode = data.SICCode || null;
        this.SICDesc = data.SICDesc || null;
        this.QualityScore = data.QualityScore || null;
    }

    toString() {
        return `Contacts: Name = ${this.Name}, Address = ${this.Address}, City = ${this.City}, State = ${this.State}, PostalCode = ${this.PostalCode}, PhoneType = ${this.PhoneType}, Latitude = ${this.Latitude}, Longitude = ${this.Longitude}, SICCode = ${this.SICCode}, SICDesc = ${this.SICDesc}, QualityScore = ${this.QualityScore}`;
    }
}

export class PhoneInfo {
    constructor(data = {}) {
        this.Provider = data.Provider ? new Provider(data.Provider) : null;
        this.Contacts = (data.Contacts || []).map(contact => new Contacts(contact));
        this.SMSAddress = data.SMSAddress || null;
        this.MMSAddress = data.MMSAddress || null;
        this.DateFirstSeen = data.DateFirstSeen || null;
        this.DateOfPorting = data.DateOfPorting || null;
        this.NoteCodes = data.NoteCodes || null;
        this.NoteDescriptions = data.NoteDescriptions || null;
        this.TokensUsed = data.TokensUsed || null;
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
        this.Type = data.Type || null;
        this.TypeCode = data.TypeCode || null;
        this.Desc = data.Desc || null;
        this.DescCode = data.DescCode || null;
    }

    toString() {
        return `Error: Type = ${this.Type}, TypeCode = ${this.TypeCode}, Desc = ${this.Desc}, DescCode = ${this.DescCode}`;
    }
}

export class GPPL2Response {
    constructor(data = {}) {
        this.PhoneNumber = data.PhoneNumber || null;
        this.TestType = data.TestType || null;
        this.LicenseKey = data.LicenseKey || null;
        this.PhoneInfo = data.PhoneInfo ? new PhoneInfo(data.PhoneInfo) : null;
    }

    toString() {
        return `GPPL2Response: PhoneNumber = ${this.PhoneNumber}, TestType = ${this.TestType}, LicenseKey = ${this.LicenseKey}, PhoneInfo = ${this.PhoneInfo ? this.PhoneInfo.toString() : 'null'}`;
    }
}

export default GPPL2Response;
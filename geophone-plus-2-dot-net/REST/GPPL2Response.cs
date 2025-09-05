using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geophone_plus_2_dot_net.REST
{
    public class GPPL2Response
    {
        public string PhoneNumber { get; set; }
        public string TestType { get; set; }
        public string LicenseKey { get; set; }
        public PhoneInfo PhoneInfo { get; set; }
        public Error Error { get; set; }
    }
    public class PhoneInfo
    {
        public Provider Provider { get; set; }
        public Contacts[] Contacts { get; set; }
        public string SMSAddress { get; set; }
        public string MMSAddress { get; set; }
        public string DateFirstSeen { get; set; }
        public string DateOfPorting { get; set; }
        public string NoteCodes { get; set; }
        public string NoteDescriptions { get; set; }
        public string TokensUsed { get; set; }

        public override string ToString()
        {
            string contactsString = Contacts != null ? string.Join(", ", Contacts.Select(contact => contact.ToString())) : "null";

            return $"PhoneInfo - Providers: {Provider}, Contacts: [{contactsString}], SMSAddress: {SMSAddress}, MMSAddress: {MMSAddress}, DateFirstSeen: {DateFirstSeen}, DateOfPorting: {DateOfPorting}, NoteCodes: {NoteCodes}, NoteDescriptions: {NoteDescriptions}, TokensUsed: {TokensUsed}";
        }
    }
    public class Provider
    {
        public string Name { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string LineType { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public override string ToString()
        {
            return $"Provider - Name: {Name}, City: {City}, State: {State}, LineType: {LineType}, Latitude: {Latitude}, Longitude: {Longitude}";
        }
    }
    public class Contacts
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string PhoneType { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string SICCode { get; set; }
        public string SICDesc { get; set; }
        public string QualityScore { get; set; }

        public override string ToString()
        {
            return $"Contacts - Name: {Name}, Address: {Address}, City: {City}, State: {State}, PostalCode: {PostalCode}, PhoneType: {PhoneType}, Latitude: {Latitude}, Longitude: {Longitude}, SICCode: {SICCode}, SICDesc: {SICDesc}, QualityScore: {QualityScore}";
        }
    }
    public class Error
    {
        public string Type { get; set; }
        public string TypeCode { get; set; }
        public string Desc { get; set; }
        public string DescCode { get; set; }
        public override string ToString()
        {
            return $"Type: {Type} " +
                $"TypeCode: {TypeCode} " +
                $"Desc: {Desc} " +
                $"DescCode: {DescCode} ";
        }
    }

}

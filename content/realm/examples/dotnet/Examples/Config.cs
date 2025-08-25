using System;
using Realms.Sync;

namespace Examples
{
    public class Config
    {
        public const string AppId = "dotnet-partition-jrmal";
        public const string FSAppId = "dotnet-flexible-wtzwc";
        public const string Username = "foo@foo.com";
        public const string Password = "foobar";
        public static Credentials EPCreds = Credentials.EmailPassword(Username, Password);
        public const string ApiKey = "jvoSntrNBHwI1yFws4wLuv5PRB5Fgf1mSvrzGhZwAWVgr22pbzT4lrUmovODeOAx";
        public const string JwtToken = "eyJhdWQiOiJkb3RuZXQtcGFydGl0aW9uLWpybWFsIiwiZXhwIjo5OTk5OTk5OTksImlhdCI6MTY3MjUzNDk1NSwibmFtZSI6IkNhbGViIiwic3ViIjoiMTIzNDU2Nzg5MCIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImNhbGViQGV4YW1wbGUuY29tIiwiaWF0IjoxNjAxNjc4ODcyLCJleHAiOjk5OTk5OTk5OTksImF1ZCI6ImRvdG5ldC1wYXJ0aXRpb24tanJtYWwifQ.Ta8McYDupP1XgI5SMUDVnOFoN6iYEzxqL3Iwq1IlpM0";
    }
}
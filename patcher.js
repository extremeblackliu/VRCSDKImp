const fs = require('fs');

/*
    semi-auto patch script
    author: Ex(admin@eeacks.cc)
    does: .cs patch, binary file domain replacement
    put this file in X:\YourProjectFolder\Packages\patcher.js
*/

// most average patternscan you can see... we dont care performance at all
function PatternScanAll(buffer, signature)
{
    let signature_buf = Buffer.from(signature, 'binary');
    let result = [];
    for(let i = 0 ; i < buffer.length; i++)
    {
        let found = true;
        for(let k = 0 ; k < signature_buf.length; k++)
        {
            if(buffer[i + k] != signature_buf[k])
            {
                found = false;
                break;
            }
        }
        if(found)
        {
            result.push(i);
            i += signature_buf.length;
        }
    }
    return result;
}

const NEW_DOMAIN = "vrcsdk.eeacks.cc";

let source1 = fs.readFileSync("./Packages/com.vrchat.base/Editor/VRCSDK/Dependencies/VRChat/API/VRCApi.cs").toString();

source1 = source1.replaceAll("api.vrchat.cloud", NEW_DOMAIN);

// replace function declare
source1 = source1.replace("private static HttpClient GetClient(Uri url)", "private static HttpClient GetClient(Uri url, bool pNotUseProxy = false)");

// replace proxy building
source1 = source1.replace(
`var handler = new HttpClientHandler
                {
                    CookieContainer = cookies,
                    UseProxy = false
                };`, 
`var handler = new HttpClientHandler
		{
			CookieContainer = cookies,
			UseProxy = true,
			Proxy = WebRequest.GetSystemWebProxy(),
		};
		if(pNotUseProxy)
		{
			handler = new HttpClientHandler
			{
				CookieContainer = cookies,
				UseProxy = false
			};
		}`);

// replace call
source1 = source1.replace("var client = GetClient(request.RequestUri);", `var client = GetClient(request.RequestUri, request.RequestUri.Host == "s3.amazonaws.com");`);
fs.writeFileSync("./Packages/com.vrchat.base/Editor/VRCSDK/Dependencies/VRChat/API/VRCApi.cs", source1);

// api.vrchat.cloud
const URL_PATTERN =   "\x61\x00\x70\x00\x69\x00\x2E\x00\x76\x00\x72\x00\x63\x00\x68\x00\x61\x00\x74\x00\x2E\x00\x63\x00\x6C\x00\x6F\x00\x75\x00\x64\x00";

// vrcsdk.eeacks.cc
const REPLACE_BYTES = "\x76\x00\x72\x00\x63\x00\x73\x00\x64\x00\x6B\x00\x2E\x00\x65\x00\x65\x00\x61\x00\x63\x00\x6B\x00\x73\x00\x2E\x00\x63\x00\x63\x00";

let binary1 = fs.readFileSync("./Packages/com.vrchat.base/Runtime/VRCSDK/Plugins/VRCCore-Editor.dll");
const result = PatternScanAll(binary1, URL_PATTERN);

if(result.length > 0)
{
    for(const offset of result)
    {
        const ReplaceBinary = Buffer.from(REPLACE_BYTES, 'binary');
        for(let i = 0; i < ReplaceBinary.length; i++)
        {
            binary1[offset + i] = ReplaceBinary[i];
        }
    }
    
    fs.writeFileSync("./Packages/com.vrchat.base/Runtime/VRCSDK/Plugins/VRCCore-Editor.dll", binary1);
    console.log("VRCCore-Editor.dll -> [api.vrchat.cloud -> vrcsdk.eeacks.cc] patched.");
}
else console.log("VRCCore-Editor.dll -> api.vrchat.cloud - is not found in binary! is the file already patched or the file is invalid?");

/*

    Last step:
    
    Cert verify Patches:
    VRCCore-Editor.dll
    ->
    VRC.Core.ApiCertificateVerifier
    VRC.Core.API.CertVerifyHTTPRequest
    VRC.Core.API.CertVerifyUnityWebRequest

*/
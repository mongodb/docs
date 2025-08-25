import 'package:realm_dart/realm.dart';
import "dart:io";
import "dart:convert";

IOClient createCustomHttpsClient(String cert) {
  SecurityContext context = SecurityContext.defaultContext;
  try {
    final bytes = utf8.encode(cert);
    context.setTrustedCertificatesBytes(bytes);
  } on TlsException catch (e) {
    final message = e.osError?.message ?? "";
    if (!message.contains('CERT_ALREADY_IN_HASH_TABLE')) {
      rethrow;
    }
  }

  return IOClient(HttpClient(context: context));
}

App createAppWithCustomHttpsClient(
    String letsEncryptCertificate, String appId) {
  IOClient ioClient = createCustomHttpsClient(letsEncryptCertificate);
  final appConfig = AppConfiguration(appId, httpClient: ioClient);
  return App(appConfig);
}

final letsEncryptCertificate = "<LET'S ENCRYPT CERTIFICATE>";
final appId = "<YOUR APP ID>";

final app = createAppWithCustomHttpsClient(letsEncryptCertificate, appId);

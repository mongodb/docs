package com.mongodb;

import java.util.Map;
import java.util.function.Supplier;

import com.mongodb.kafka.connect.util.custom.credentials.CustomCredentialProvider;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.services.securitytoken.AWSSecurityTokenService;
import com.amazonaws.services.securitytoken.AWSSecurityTokenServiceAsyncClientBuilder;
import com.amazonaws.services.securitytoken.model.AssumeRoleRequest;
import com.amazonaws.services.securitytoken.model.AssumeRoleResult;
import com.amazonaws.services.securitytoken.model.Credentials;
import com.amazonaws.util.StringUtils;

public class SampleAssumeRoleCredential implements CustomCredentialProvider {

  public SampleAssumeRoleCredential() {}
  @Override
  public MongoCredential getCustomCredential(Map<?, ?> map) {
    AWSCredentialsProvider provider = new DefaultAWSCredentialsProviderChain();
    Supplier<AwsCredential> awsFreshCredentialSupplier = () -> {
      AWSSecurityTokenService stsClient = AWSSecurityTokenServiceAsyncClientBuilder.standard()
          .withCredentials(provider)
          .withRegion("us-east-1")
          .build();
      AssumeRoleRequest assumeRoleRequest = new AssumeRoleRequest().withDurationSeconds(3600)
          .withRoleArn((String)map.get("mongodbaws.auth.mechanism.roleArn"))
          .withRoleSessionName("Test_Session");
      AssumeRoleResult assumeRoleResult = stsClient.assumeRole(assumeRoleRequest);
      Credentials creds = assumeRoleResult.getCredentials();
      // Add your code to fetch new credentials
      return new AwsCredential(creds.getAccessKeyId(), creds.getSecretAccessKey(), creds.getSessionToken());
    };
    return MongoCredential.createAwsCredential(null, null)
        .withMechanismProperty(MongoCredential.AWS_CREDENTIAL_PROVIDER_KEY, awsFreshCredentialSupplier);
  }
  
  // Validates presence of an ARN
  @Override
  public void validate(Map<?, ?> map) {
    String roleArn = (String) map.get("mongodbaws.auth.mechanism.roleArn");
    if (StringUtils.isNullOrEmpty(roleArn)) {
      throw new RuntimeException("Invalid value set for customProperty");
    }
  }

  // Initializes the custom provider
  @Override
  public void init(Map<?, ?> map) {

  }
}
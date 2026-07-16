.. tip:: Service Account Token Best Practices
  
   Consider the following best practices when using service account tokens:

   - **Reuse tokens**: Service account access tokens have a 1 hour
     (3600 seconds) lifespan, during which you can reuse the token multiple
     times. Avoid creating new tokens for every request.
   - **Generate new tokens when needed**: While you can't refresh an access token,
     you can :ref:`generate a new token <generate-oauth2-token-atlas>` when your
     current token is close to expiry. This prevents service interruptions and
     allows you to maintain authorized service account access.
   - **Revoke unnecessary tokens**: When you no longer need a token,
     :ref:`revoke the token's access <revoke-oauth2-token-atlas>` to minimize
     security risks and ensure that only active tokens have access to your service
     account.
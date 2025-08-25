await app.EmailPasswordAuth.CallResetPasswordFunctionAsync(
    userEmail, myNewPassword,
    "<security-question-1-answer>",
    "<security-question-2-answer>");

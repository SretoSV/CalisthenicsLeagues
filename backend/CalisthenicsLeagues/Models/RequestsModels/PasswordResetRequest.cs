﻿namespace CalisthenicsLeagues.Models.RequestsModels
{
    public class PasswordResetRequest
    {
        public string Email { get; set; } = string.Empty;
        public string OldPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}

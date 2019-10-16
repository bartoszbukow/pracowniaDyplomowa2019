using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;
using EstateAgency.ViewModels;
using EstateAgency.Data;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using EstateAgency.Data.Models;


namespace EstateAgency.Controllers
{
    public class TokenController : BaseApiController
    {
        #region Private Members  

        #endregion Private Members

        #region Constructor       

        public TokenController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration
        )
            : base(context, roleManager, userManager, configuration)
        {
        }

        #endregion

        [HttpPost("Auth")]
        public async Task<IActionResult> Jwt([FromBody] TokenRequestViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);
            
            switch (model.grant_type)
            {
                case "password": return await GetToken(model);
                default: return new UnauthorizedResult();
            }
        }

        private async Task<IActionResult> GetToken(TokenRequestViewModel model)
        {
            try
            {
                var user = await UserManager.FindByNameAsync(model.username);

                if (user == null && model.username.Contains("@"))
                    user = await UserManager.FindByEmailAsync(model.username);
                if (user == null || !await UserManager.CheckPasswordAsync(user, model.password))
                {
                    return new UnauthorizedResult();
                }

                DateTime now = DateTime.UtcNow;

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat,
                        new DateTimeOffset(now).ToUnixTimeSeconds().ToString())
                    // TODO: add additional claims here
                };
                var tokenExpirationMins = Configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
                var issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"]));

                var token = new JwtSecurityToken(
                    issuer: Configuration["Auth:Jwt:Issuer"],
                    audience: Configuration["Auth:Jwt:Audience"],
                    claims: claims,
                    notBefore: now,
                    expires: now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                    signingCredentials: new SigningCredentials(issuerSigningKey,
                        SecurityAlgorithms.HmacSha256));

                var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
                // build & return the response
                var response = new TokenResponseViewModel()
                {
                    token = encodedToken,
                    expiration = tokenExpirationMins
                };
                return Json(response);
            }
            catch (Exception ex)
            {
                return new UnauthorizedResult();
            }
        }
    }
}



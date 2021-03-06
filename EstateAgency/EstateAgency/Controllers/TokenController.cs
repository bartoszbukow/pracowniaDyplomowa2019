﻿using System;
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
                case "refresh_token": return await RefreshToken(model);
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

                if(user.Flags == 1)
                {
                    return BadRequest(106);
                }

                var rt = CreateRefreshToken(model.clientId, user.Id);
                DbContext.Tokens.Add(rt);
                DbContext.SaveChanges();

                var roles = await UserManager.GetRolesAsync(user);
                var t = CreateAccessToken(user.Id, rt.Value, roles);
                return Json(t);
            }
            catch (Exception ex)
            {
                return new UnauthorizedResult();
            }
        }

        private async Task<IActionResult> RefreshToken(TokenRequestViewModel model)
        {
            try
            {
                var rt = DbContext.Tokens.FirstOrDefault(t => t.ClientId == model.clientId && t.Value == model.refresh_token);
                if (rt == null)
                {
                    return new UnauthorizedResult();
                }

                var user = await UserManager.FindByIdAsync(rt.UserId);
                if (user == null)
                {
                    return new UnauthorizedResult();
                }

                var rtNew = CreateRefreshToken(rt.ClientId, rt.UserId);

                DbContext.Tokens.Remove(rt);
                DbContext.Tokens.Add(rtNew);
                DbContext.SaveChanges();

                var roles = await UserManager.GetRolesAsync(user);
                var response = CreateAccessToken(rtNew.UserId, rtNew.Value, roles);

                return Json(response);
            }
            catch (Exception ex)
            {
                return new UnauthorizedResult();
            }
        }

        private Token CreateRefreshToken(string clientId, string userId)
        {
            return new Token()
            {
                ClientId = clientId,
                UserId = userId,
                Type = 0,
                Value = Guid.NewGuid().ToString("N"),
                CreatedDate = DateTime.UtcNow
            };
        }

        private TokenResponseViewModel CreateAccessToken(string userId, string refreshToken, IList<string> roles)
        {
            DateTime now = DateTime.UtcNow;

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString())
            }
            .Union(roles.Select(r => new Claim("roles", r)));

            var tokenExpirationMins = Configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
            var issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"]));

            var token = new JwtSecurityToken(
                issuer: Configuration["Auth:Jwt:Issuer"],
                audience: Configuration["Auth:Jwt:Audience"],
                claims: claims,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                signingCredentials: new SigningCredentials(issuerSigningKey, SecurityAlgorithms.HmacSha256));
            
            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
            
            return new TokenResponseViewModel()
            {
                token = encodedToken,
                expiration = tokenExpirationMins,
                refresh_token = refreshToken
            };
        }
    }
}



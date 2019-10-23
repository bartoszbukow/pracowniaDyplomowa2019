﻿using EstateAgency.Data;
using EstateAgency.Data.Models;
using EstateAgency.ViewModels;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstateAgency.Controllers
{
    public class UserController : BaseApiController
    {
        #region Constructor    
        public UserController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration) : base(context, roleManager, userManager, configuration) { }
        #endregion

        #region RESTful Conventions              
        [HttpPost()]
        public async Task<IActionResult> Add([FromBody]UserViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);
            ApplicationUser user = await UserManager.FindByNameAsync(model.UserName);

            if (user != null) return BadRequest("Username already exists");
            user = await UserManager.FindByEmailAsync(model.Email);

            if (user != null) return BadRequest("Email already exists.");
            var now = DateTime.Now;

            user = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.UserName,
                Email = model.Email,
                DisplayName = model.DisplayName,
                CreatedDate = now,
                LastModifiedDate = now
            };

            await UserManager.CreateAsync(user, model.Password);
            await UserManager.AddToRoleAsync(user, "RegisteredUser");

            user.EmailConfirmed = true;
            user.LockoutEnabled = false;

            DbContext.SaveChanges();
            return Json(user.Adapt<UserViewModel>(), JsonSettings);
        }
        #endregion
    }
}


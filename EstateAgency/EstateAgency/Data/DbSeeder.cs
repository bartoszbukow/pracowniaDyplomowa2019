using EstateAgency.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;

namespace EstateAgency.Data
{
    public class DbSeeder
    {
        #region Public Methods 
        public static void Seed(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            if (!dbContext.Users.Any())
            {
                CreateUsers(dbContext, roleManager, userManager).GetAwaiter().GetResult();
            }

            if (!dbContext.Advertisements.Any()) CreateAdvertisements(dbContext);
        }
        #endregion

        #region Seed Methods 
        private static async Task CreateUsers(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            DateTime createdDate = new DateTime(2016, 03, 01, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            string role_Administrator = "Administrator";
            string role_RegisteredUser = "RegisteredUser";

            if (!await roleManager.RoleExistsAsync(role_Administrator))
            {
                await roleManager.CreateAsync(new IdentityRole(role_Administrator));
            }

            if (!await roleManager.RoleExistsAsync(role_RegisteredUser))
            {
                await roleManager.CreateAsync(new IdentityRole(role_RegisteredUser));
            }

            var user_Admin = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Admin",
                Email = "admin@admin.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate,
                PhoneNumber = "516603856",
                Name = "Admin",
                Surname = "Admin",
                Type = 1
            };

            if (await userManager.FindByNameAsync(user_Admin.UserName) == null)
            {
                await userManager.CreateAsync(user_Admin, "Pass4Admin$");
                await userManager.AddToRoleAsync(user_Admin, role_RegisteredUser);
                await userManager.AddToRoleAsync(user_Admin, role_Administrator);

                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }
#if DEBUG    
            var user_Ryan = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Ryan",
                Email = "ryan@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate,
                PhoneNumber = "515609978",
                Name = "Ryan",
                Surname = "Ronaldo"
            };
            var user_Solice = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Solice",
                Email = "solice@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate,
                PhoneNumber = "603394456",
                Name = "Solice",
                Surname = "Benzema"
            };
            var user_Vodan = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Vodan",
                Email = "vodan@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate,
                PhoneNumber = "609354423",
                Name = "Vodan",
                Surname = "Bale"
            };
            
            if (await userManager.FindByNameAsync(user_Ryan.UserName) == null)
            {
                await userManager.CreateAsync(user_Ryan, "Pass4Ryan$");
                await userManager.AddToRoleAsync(user_Ryan, role_RegisteredUser);
                user_Ryan.EmailConfirmed = true;
                user_Ryan.LockoutEnabled = false;
            }
           
            if (await userManager.FindByNameAsync(user_Solice.UserName) == null)
            {
                await userManager.CreateAsync(user_Solice, "Pass4Solice$");
                await userManager.AddToRoleAsync(user_Solice, role_RegisteredUser);
                user_Solice.EmailConfirmed = true;
                user_Solice.LockoutEnabled = false;
            }
            
            if (await userManager.FindByNameAsync(user_Vodan.UserName) == null)
            {
                await userManager.CreateAsync(user_Vodan, "Pass4Vodan$");
                await userManager.AddToRoleAsync(user_Vodan, role_RegisteredUser);
                user_Vodan.EmailConfirmed = true;
                user_Vodan.LockoutEnabled = false;
            }

#endif
            await dbContext.SaveChangesAsync();
        }

        private static void CreateAdvertisements(ApplicationDbContext dbContext)
        {
            DateTime createdDate = new DateTime(2016, 03, 01, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            var authorId = dbContext.Users.FirstOrDefault(u => u.UserName == "Admin")?.Id;
            var authorEmail = dbContext.Users.FirstOrDefault(u => u.UserName == "Admin")?.Email;
#if DEBUG    
            var num = 47;
            for (int i = 1; i <= num; i++)
            {
                CreateSampleAdvertisement(dbContext, i, authorId, authorEmail, 3, 3, createdDate.AddDays(-num));
            }
#endif
            dbContext.SaveChanges();
        }
        #endregion

        #region Utility Methods 
        private static void CreateSampleAdvertisement(
            ApplicationDbContext dbContext, int num, string authorId, string authorEmail, int numberOfReservations, int numberOfImages, DateTime createdDate)
        {
            var advertisement = new Advertisement()
            {
                UserId = authorId,
                Email = authorEmail,
                Title = $"Piękne mieszkanie numer {num} w centrum Olsztyna!",
                Description = $"This is a sample description for advertisement {num}.",
                Price = 2131,
                Yardage = 11,
                Category = "Domy",
                CreatedDate = createdDate,
                LastModifiedDate = createdDate,
                City = "Olsztyn",
                Address = "Barcza 44/39",
                NumberOfRoom = 3,
                Flag = 0
            };
            dbContext.Advertisements.Add(advertisement);
            dbContext.SaveChanges();

            for (int i = 0; i < numberOfReservations; i++)
            {
                dbContext.Reservations.Add(new Reservation()
                {
                    UserId = authorId,
                    AdvertisementId = advertisement.Id,
                    ReservationActive = 1,
                    CreatedDate = createdDate,
                    ReservationTo = createdDate,
                    ReservationFrom = createdDate
                });

            }

            for (int i = 1; i <= numberOfImages; i++)
            {
                dbContext.Images.Add(new Image()
                {
                    AdvertisementId = advertisement.Id,
                    Path = $"images/{i}.jpg"
                });
            }
            dbContext.SaveChanges();
        }
        #endregion
    }
}

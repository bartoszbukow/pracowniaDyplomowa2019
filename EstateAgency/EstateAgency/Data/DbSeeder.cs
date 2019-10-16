﻿using EstateAgency.Data.Models;
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
            // Create default Users (if there are none)
            if (!dbContext.Users.Any())
            {
                CreateUsers(dbContext, roleManager, userManager).GetAwaiter().GetResult();
            }

            // Create default Advertisements (if there are none) together with their set of Q&A
            if (!dbContext.Advertisements.Any()) CreateAdvertisements(dbContext);
        }
        #endregion

        #region Seed Methods 
        private static async Task CreateUsers(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            // local variables
            DateTime createdDate = new DateTime(2016, 03, 01, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            string role_Administrator = "Administrator";
            string role_RegisteredUser = "RegisteredUser";

            //Create Roles (if they doesn't exist yet)
            if (!await roleManager.RoleExistsAsync(role_Administrator))
            {
                await roleManager.CreateAsync(new IdentityRole(role_Administrator));
            }

            if (!await roleManager.RoleExistsAsync(role_RegisteredUser))
            {
                await roleManager.CreateAsync(new IdentityRole(role_RegisteredUser));
            }

            // Create the "Admin" ApplicationUser account (if it doesn't exist already)
            var user_Admin = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Admin",
                Email = "admin@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            // Insert "Admin" into the Database and assign the "Administrator" and "RegisteredUser" roles to him.
            if (await userManager.FindByNameAsync(user_Admin.UserName) == null)
            {
                await userManager.CreateAsync(user_Admin, "Pass4Admin");
                await userManager.AddToRoleAsync(user_Admin, role_RegisteredUser);
                await userManager.AddToRoleAsync(user_Admin, role_Administrator);
                // Remove Lockout and E-Mail confirmation.
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }
#if DEBUG    
            // Create some sample registered user accounts (if they don't exist already)
            var user_Ryan = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Ryan",
                Email = "ryan@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };
            var user_Solice = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Solice",
                Email = "solice@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };
            var user_Vodan = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Vodan",
                Email = "vodan@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };
            
            /// Insert sample registered users into the Database and also assign the "Registered" role to him.
            if (await userManager.FindByNameAsync(user_Ryan.UserName) == null)
            {
                await userManager.CreateAsync(user_Ryan, "Pass4Ryan");
                await userManager.AddToRoleAsync(user_Ryan, role_RegisteredUser);
                // Remove Lockout and E-Mail confirmation.
                user_Ryan.EmailConfirmed = true;
                user_Ryan.LockoutEnabled = false;
            }
           
            if (await userManager.FindByNameAsync(user_Solice.UserName) == null)
            {
                await userManager.CreateAsync(user_Solice, "Pass4Solice");
                await userManager.AddToRoleAsync(user_Solice, role_RegisteredUser);
                // Remove Lockout and E-Mail confirmation.
                user_Solice.EmailConfirmed = true;
                user_Solice.LockoutEnabled = false;
            }
            
            if (await userManager.FindByNameAsync(user_Vodan.UserName) == null)
            {
                await userManager.CreateAsync(user_Vodan, "Pass4Vodan");
                await userManager.AddToRoleAsync(user_Vodan, role_RegisteredUser);
                // Remove Lockout and E-Mail confirmation.
                user_Vodan.EmailConfirmed = true;
                user_Vodan.LockoutEnabled = false;
            }

#endif
            await dbContext.SaveChangesAsync();
        }

        private static void CreateAdvertisements(ApplicationDbContext dbContext)
        {
            // local variables
            DateTime createdDate = new DateTime(2016, 03, 01, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            // retrieve the admin user, which we'll use as default author.
            var authorId = dbContext.Users.FirstOrDefault(u => u.UserName == "Admin")?.Id;
#if DEBUG    
            // create 47 sample advertisements with auto-generated data
            // // (including advertisements, advertisementHistorys & reservations)
            var num = 47;
            for (int i = 1; i <= num; i++)
            {
                CreateSampleAdvertisement(dbContext, i, authorId, 3, 3, createdDate.AddDays(-num));
            }
#endif
            // create 3 more advertisements with better descriptive data
            // (we'll add the advertisements, advertisementHistorys & reservations later on)

            EntityEntry<Advertisement> e1 = dbContext.Advertisements.Add(new Advertisement()
            {
                UserId = authorId,
                Title = "Are you more Light or Dark side of the Force?",
                Description = "Star Wars personality test",
                Price = 23332,
                Yardage = 23,
                Category = "Mieszkania",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate

            });

            EntityEntry<Advertisement> e2 = dbContext.Advertisements.Add(new Advertisement()
            {
                UserId = authorId,
                Title = "GenX, GenY or Genz?",
                Description = "Find out what decade most represents you",
                Price = 232,
                Yardage = 22,
                Category = "Domy",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            });

            EntityEntry<Advertisement> e3 = dbContext.Advertisements.Add(new Advertisement()
            {
                UserId = authorId,
                Title = "Which Shingeki No Kyojin character are you?",
                Description = "Attack On Titan personality test",
                Price = 2131,
                Yardage = 11,
                Category = "Mieszkania",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            });
            // persist the changes on the Database
            dbContext.SaveChanges();
        }
        #endregion

        #region Utility Methods 
        private static void CreateSampleAdvertisement(
            ApplicationDbContext dbContext, int num, string authorId, int numberOfAdvertisementHistory, int numberOfReservations, DateTime createdDate)
        {
            var advertisement = new Advertisement()
            {
                UserId = authorId,
                Title = $"Quiz {num} Title",
                Description = $"This is a sample description for advertisement {num}.",
                Price = 2131,
                Yardage = 11,
                Category = "Domy",
                CreatedDate = createdDate,
                LastModifiedDate = createdDate

            };
            dbContext.Advertisements.Add(advertisement);
            dbContext.SaveChanges();

            for (int i = 0; i < numberOfAdvertisementHistory; i++)
            {
                var advertisementHistory = new AdvertisementHistory()
                {
                    AdvertisementId = advertisement.Id,
                    Notes = "This is a sample advertisement created by the DbSeeder class for testing purposes. " +
                                             "All the child advertisement history are auto-generated as well.",
                    CreatedDate = createdDate
                };
                dbContext.AdvertisementHistorys.Add(advertisementHistory);
                dbContext.SaveChanges();
            }
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
            dbContext.SaveChanges();
        }
        #endregion
    }
}
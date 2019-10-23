using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstateAgency.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace EstateAgency.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        #region Constructor   

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        #endregion Constructor

        #region Methods     
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUser>().ToTable("Users"); 
            modelBuilder.Entity<ApplicationUser>().HasMany(u => u.Advertisements).WithOne(i => i.User);
            modelBuilder.Entity<ApplicationUser>().HasMany(u => u.Reservations).WithOne(i => i.User);
            modelBuilder.Entity<ApplicationUser>().HasMany(u => u.Tokens).WithOne(i => i.User);

            modelBuilder.Entity<Advertisement>().ToTable("Advertisements"); 
            modelBuilder.Entity<Advertisement>().Property(i => i.Id).ValueGeneratedOnAdd(); 
            modelBuilder.Entity<Advertisement>().HasOne(i => i.User).WithMany(u => u.Advertisements);
            modelBuilder.Entity<Advertisement>().HasMany(i => i.AdvertisementHistorys).WithOne(c => c.Advertisement);

            modelBuilder.Entity<Reservation>().ToTable("Reservations");
            modelBuilder.Entity<Reservation>().Property(i => i.Id).ValueGeneratedOnAdd(); 
            modelBuilder.Entity<Reservation>().HasOne(i => i.User).WithMany(u => u.Reservations); 
            modelBuilder.Entity<Reservation>().HasOne(i => i.Advertisement).WithMany(u => u.Reservations); 

            modelBuilder.Entity<AdvertisementHistory>().ToTable("AdvertisementHistorys");
            modelBuilder.Entity<AdvertisementHistory>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<AdvertisementHistory>().HasOne(i => i.Advertisement).WithMany(u => u.AdvertisementHistorys);

            modelBuilder.Entity<Token>().ToTable("Tokens"); 
            modelBuilder.Entity<Token>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Token>().HasOne(i => i.User).WithMany(u => u.Tokens);

            modelBuilder.Entity<Image>().ToTable("Images");
            modelBuilder.Entity<Image>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Image>().HasOne(i => i.Advertisement).WithMany(u => u.Images);
        }

        #endregion Methods

        #region Properties     

        public DbSet<Advertisement> Advertisements { get; set; }    
        public DbSet<AdvertisementHistory> AdvertisementHistorys { get; set; }  
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Image> Images { get; set; }

        #endregion Properties
    }
}

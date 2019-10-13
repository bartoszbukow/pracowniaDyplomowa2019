﻿// <auto-generated />
using System;
using EstateAgency.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EstateAgency.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EstateAgency.Data.Models.Advertisement", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description");

                    b.Property<DateTime>("LastModifiedDate");

                    b.Property<double>("Price");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.Property<int>("Type");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.Property<double>("Yardage");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Advertisements");
                });

            modelBuilder.Entity("EstateAgency.Data.Models.AdvertisementHistory", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdvertisementId")
                        .IsRequired();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Notes");

                    b.HasKey("Id");

                    b.HasIndex("AdvertisementId");

                    b.ToTable("AdvertisementHistorys");
                });

            modelBuilder.Entity("EstateAgency.Data.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("DisplayName");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<int>("Flags");

                    b.Property<DateTime>("LastModifiedDate");

                    b.Property<string>("Notes");

                    b.Property<int>("Type");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EstateAgency.Data.Models.Reservation", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdvertisementId");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<int>("ReservationActive");

                    b.Property<DateTime>("ReservationFrom");

                    b.Property<DateTime>("ReservationTo");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("AdvertisementId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("EstateAgency.Data.Models.Advertisement", b =>
                {
                    b.HasOne("EstateAgency.Data.Models.ApplicationUser", "User")
                        .WithMany("Advertisements")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EstateAgency.Data.Models.AdvertisementHistory", b =>
                {
                    b.HasOne("EstateAgency.Data.Models.Advertisement", "Advertisement")
                        .WithMany("AdvertisementHistorys")
                        .HasForeignKey("AdvertisementId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EstateAgency.Data.Models.Reservation", b =>
                {
                    b.HasOne("EstateAgency.Data.Models.Advertisement", "Advertisement")
                        .WithMany("Reservations")
                        .HasForeignKey("AdvertisementId");

                    b.HasOne("EstateAgency.Data.Models.ApplicationUser", "User")
                        .WithMany("Reservations")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}

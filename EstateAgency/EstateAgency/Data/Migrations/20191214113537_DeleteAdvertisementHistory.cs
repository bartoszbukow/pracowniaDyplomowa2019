using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EstateAgency.Data.Migrations
{
    public partial class DeleteAdvertisementHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdvertisementHistorys");

            migrationBuilder.DropColumn(
                name: "Rent",
                table: "Advertisements");

            migrationBuilder.AddColumn<int>(
                name: "Flag",
                table: "Advertisements",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Flag",
                table: "Advertisements");

            migrationBuilder.AddColumn<int>(
                name: "Rent",
                table: "Advertisements",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AdvertisementHistorys",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    AdvertisementId = table.Column<string>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Notes = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdvertisementHistorys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdvertisementHistorys_Advertisements_AdvertisementId",
                        column: x => x.AdvertisementId,
                        principalTable: "Advertisements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdvertisementHistorys_AdvertisementId",
                table: "AdvertisementHistorys",
                column: "AdvertisementId");
        }
    }
}

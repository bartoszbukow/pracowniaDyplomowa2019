using Microsoft.EntityFrameworkCore.Migrations;

namespace EstateAgency.Data.Migrations
{
    public partial class AdvertisementUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Advertisements",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Advertisements");
        }
    }
}

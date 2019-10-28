using Microsoft.EntityFrameworkCore.Migrations;

namespace EstateAgency.Data.Migrations
{
    public partial class AdditionalFieldsOfAnnouncement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "Advertisements",
                nullable: true,
                oldClrType: typeof(double));

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Advertisements",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Advertisements",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfRoom",
                table: "Advertisements",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Rent",
                table: "Advertisements",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "NumberOfRoom",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "Rent",
                table: "Advertisements");

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "Advertisements",
                nullable: false,
                oldClrType: typeof(double),
                oldNullable: true);
        }
    }
}

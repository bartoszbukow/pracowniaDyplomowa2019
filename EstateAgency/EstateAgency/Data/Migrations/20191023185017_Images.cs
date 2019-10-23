using Microsoft.EntityFrameworkCore.Migrations;

namespace EstateAgency.Data.Migrations
{
    public partial class Images : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    AdvertisementId = table.Column<string>(nullable: true),
                    Path = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Advertisements_AdvertisementId",
                        column: x => x.AdvertisementId,
                        principalTable: "Advertisements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_AdvertisementId",
                table: "Images",
                column: "AdvertisementId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");
        }
    }
}

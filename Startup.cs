using GIGTickets.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer; 
using Microsoft.AspNetCore.Identity;  
using GIGTickets.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using GIGTickets.Repository;
using GIGTickets.Data.DataManager;
using Microsoft.AspNetCore.Authentication.Certificate;
using Microsoft.AspNetCore.Http;

namespace GIGTickets
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // ********** AUTHENTICATION /// JWT **********

            //Inject AppSettings
            services.Configure<AppSettings>(Configuration.GetSection("ApplicationSettings"));
             
            services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<APIDBContext>();

            services.Configure<IdentityOptions>(options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredLength = 4;
                }
            );

            // Jwt Authentication
            var key = Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:JWT_Secret"].ToString());
             
            // For Postman + extern
            services.AddAuthentication(CertificateAuthenticationDefaults.AuthenticationScheme)
            .AddCertificate();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x => {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddHttpContextAccessor();

            // ********** ADD MVC **********
            //  services.AddMvc(); 
            // services.AddMvc(option => option.EnableEndpointRouting = false) 
            //  .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);  
            // ********** ADD CORS FOR SECURITY REQUEST **********
            services.AddCors();
             
	        //remove default json formatting
	        services.AddControllers().AddJsonOptions(options =>
            {
                //options.RespectBrowserAcceptHeader = true; // false by default
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
                options.JsonSerializerOptions.DictionaryKeyPolicy = null;
            });

            services.AddMvc().AddJsonOptions(o =>
            {
                o.JsonSerializerOptions.PropertyNamingPolicy = null;
                o.JsonSerializerOptions.DictionaryKeyPolicy = null;
            });
             
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            // ********** ADD DBCONTEXT **********
            // available for all the controllers
            services.AddDbContext<APIDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));
            // TO INIT ADMIN USER
            services.AddTransient<InitUsersDB>(); 
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, InitUsersDB initUsersDB)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            } 

            // Cors configuration
            //app.UseCors(a => a.SetIsOriginAllowed(x => _ = true).AllowAnyMethod().AllowAnyHeader().AllowCredentials());

            app.UseCors(options =>
                options.WithOrigins(Configuration["ApplicationSettings:Client_URL"].ToString())
                    .AllowAnyMethod()
                    .AllowAnyHeader());
             
            string test = Configuration["ApplicationSettings:Client_URL"].ToString();
             
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            // AUTHENTICATION
            app.UseAuthentication();

            app.UseDeveloperExceptionPage();

            app.UseCertificateForwarding(); 

            app.UseAuthorization();
              
            app.UseEndpoints(endpoints =>
            { 
                endpoints.MapControllers(); 
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });

            // INIT IN DB ADMIN USER
            initUsersDB.Initialize();
        }
    }

}
 